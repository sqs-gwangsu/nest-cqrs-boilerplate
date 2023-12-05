import { Inject, Injectable, Logger } from "@nestjs/common";
import { MysqlUtil } from "@/shared/database/mysql/util/mysql.util";
import { Event } from "@/shared/event/event";
import { ClassType } from "@/common/utils/type.util";

@Injectable()
export class EventBus {
  @Inject()
  private readonly eventBus: EventBus;

  @Inject()
  private readonly logger: Logger;

  publish<T extends Event>(eventClass: ClassType<T>, value: Omit<T, keyof Event>): any {
    const defaultValue: Event = {
      publishedDate: new Date(),
    };

    const event: T = Object.assign(new eventClass(), defaultValue, value);

    const runEvent = () => {
      this.eventBus.publish(event);
      this.logger.debug(`[EVENT PUBLISHED] ${eventClass.name}`);
    };

    if (MysqlUtil.isInTransactional()) {
      MysqlUtil.runOnCommit(runEvent);
      return;
    }

    runEvent();
  }
}
