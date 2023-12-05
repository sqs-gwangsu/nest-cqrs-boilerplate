import { Injectable } from "@nestjs/common";
import { LoggerFactory } from "@/shared/logging/provider/logger-factory";
import { LoggerService } from "@nestjs/common/services/logger.service";
import { LoggingUtil } from "@/shared/logging/util/logging.util";

@Injectable()
export class LogService implements LoggerService {
  private readonly logger: LoggerService;

  constructor(loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLogger();
  }

  /**
   * LEVEL = 2 <br/>
   * for important information
   * @param messages
   */
  log(...messages: any[]) {
    const message = LoggingUtil.toMessage(messages);
    this.logger.log(message);
  }

  /**
   * LEVEL = 4 <br/>
   * for immediate processing
   * @param messages
   */
  error(...messages: any[]) {
    const message = LoggingUtil.toMessage(messages);
    this.logger.error(message);
  }

  /**
   * LEVEL = 3 <br/>
   * for processing
   * @param messages
   */
  warn(...messages: any[]) {
    const message = LoggingUtil.toMessage(messages);
    this.logger.warn(message);
  }

  /**
   * LEVEL = 0 <br/>
   * for developer log, only development env
   * @param messages
   */
  debug(...messages: any[]) {
    const message = LoggingUtil.toMessage(messages) as any;
    (this.logger as any).debug(message);
  }
}
