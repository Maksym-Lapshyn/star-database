const compose = (...funcs) => (wrappedComponent) => {
    return funcs.reduceRight((prevResult, f) => f(prevResult), wrappedComponent);
}

export default compose;