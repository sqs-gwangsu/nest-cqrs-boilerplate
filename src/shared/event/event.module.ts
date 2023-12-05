import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { Provider } from "@nestjs/common/interfaces/modules/provider.interface";
import { EventBus } from "@/shared/event/event-bus";
import { DiscoveryModule, DiscoveryService, Reflector } from "@nestjs/core";
import { SAFE_EVENT_HANDLER } from "@/shared/event/safe-events-handler";
import { ClassType } from "@/common/utils/type.util";
import { IEventHandler } from "@nestjs/cqrs";
import { Event } from "@/shared/event/event";

const provider: Provider = EventBus;

@Module({
  imports: [DiscoveryModule],
  providers: [provider],
  exports: [provider],
})
export class EventModule implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit(): any {
    this.discovery
      .getProviders()
      .filter(wrapper => wrapper.isDependencyTreeStatic())
      .filter(({ metatype, instance }) => {
        if (!instance || !metatype) {
          return false;
        }

        return this.reflector.get<boolean>(SAFE_EVENT_HANDLER, metatype);
      })
      .forEach(({ metatype }) => {
        this.wrap(metatype as ClassType<IEventHandler>);
      });
  }

  private wrap(handlerClass: ClassType<IEventHandler>) {
    const originFunction = handlerClass.prototype.handle;
    const _this = this;

    handlerClass.prototype.handle = async function (event: Event) {
      const className = handlerClass.name;
      const eventName = event.constructor.name;

      try {
        await originFunction.call(this, event);
      } catch (e: any) {
        _this.logger.warn(`[${eventName}].[${className}] ${e}`);
      }
    };
  }
}
