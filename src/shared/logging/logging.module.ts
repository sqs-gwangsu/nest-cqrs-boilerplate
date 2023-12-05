import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { LOGGING_METADATA, LoggingOption } from "@/common/decorator/function/logging.decorator";
import { DateUtil } from "@/common/utils/date.util";
import { LoggerFactory } from "@/shared/logging/provider/logger-factory";
import { LogService } from "@/shared/logging/provider/log.service";

@Module({
  imports: [DiscoveryModule],
  providers: [LoggerFactory, LogService, Logger],
  exports: [Logger, LogService],
})
export class LoggingModule implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit(): any {
    this.discovery
      .getProviders()
      .filter(wrapper => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => {
        return instance && Object.getPrototypeOf(instance);
      })
      .forEach(({ instance }) => {
        this.scanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (methodName: string) => {
          const loggingOption = this.reflector.get<LoggingOption>(LOGGING_METADATA, instance[methodName]);
          if (!loggingOption) {
            return;
          }

          instance[methodName] = this.wrapLoggingFunction(instance[methodName], loggingOption);
        });
      });
  }

  private wrapLoggingFunction(originalMethod: Function, option: LoggingOption) {
    const $this = this;

    return function (...args: any) {
      // @ts-ignore
      const currentInstance = this;
      const className = currentInstance.constructor.name;
      const methodName = originalMethod.name;
      const start = new Date();

      if (option.param || option.start) {
        $this.logger.debug(`${className}.${methodName}(`, option.param ? args : "{ param }", ")");
      }

      try {
        const result = originalMethod.apply(currentInstance, args);

        if (result instanceof Promise) {
          return result.then(res => {
            if (option.end || option.result) {
              $this.logger.debug(`${className}.${methodName}(): ${DateUtil.diff(start)}ms`, option.result ? res : "");
            }
            return res;
          });
        }

        if (option.end || option.result) {
          $this.logger.debug(`${className}.${methodName}(): ${DateUtil.diff(start)}ms`, option.result ? result : "");
        }
        return result;
      } catch (e) {
        throw e;
      }
    };
  }
}
