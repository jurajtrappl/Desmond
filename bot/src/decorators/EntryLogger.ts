export const entryLogger = () => {
    return (
        _target: Object,
        memberName: string,
        propertyDescriptor: PropertyDescriptor
    ) => {
        const wrapperFunction = (...args: any[]): void => {
            console.log(
                `Calling ${memberName} with arguments: ${args
                    .map((a) => JSON.stringify(a))
                    .join(',')}`
            )

            return propertyDescriptor.value.apply(this, args)
        }

        Object.defineProperty(this, memberName, {
            value: wrapperFunction,
            configurable: true,
            writable: true
        })

        return propertyDescriptor
    }
}
