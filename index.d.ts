/** Declaration file generated by dts-gen */

export = dog_statsy;

declare class dog_statsy {
    constructor(...args: any[]);

    close(...args: any[]): void;

    count(...args: any[]): void;

    decr(...args: any[]): void;

    flush(...args: any[]): void;

    gauge(...args: any[]): void;

    histogram(...args: any[]): void;

    incr(...args: any[]): void;

    meter(...args: any[]): void;

    set(...args: any[]): void;

    setFlushInterval(...args: any[]): void;

    timer(...args: any[]): void;

    trace(...args: any[]): void;

    write(...args: any[]): void;

    static captureRejectionSymbol: any;

    static captureRejections: boolean;

    static defaultMaxListeners: number;

    static errorMonitor: any;

    static init(opts: any): void;

    static listenerCount(emitter: any, type: any): any;

    static on(emitter: any, event: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;

}

declare namespace dog_statsy {
    class EventEmitter {
        constructor(opts: any);

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static captureRejectionSymbol: any;

        static captureRejections: boolean;

        static defaultMaxListeners: number;

        static errorMonitor: any;

        static init(opts: any): void;

        static listenerCount(emitter: any, type: any): any;

        static on(emitter: any, event: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;

    }

}


