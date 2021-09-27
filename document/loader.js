module.exports.pitch = function (remainingRequest, previousRequest, data) {
    this.data === data
    this.callback(null, )
    this.async(null,)
    return []
}

module.exports = function() {
    this.callback(null, )
    this.async(null,)
    return []
}


/**
 *  - 有pitch方法(就是不会处理源代码)
 * 
 *    - 有返回值(args)
 *   
 *       - 进入normal阶段(依次执行normal代码， args作为流程处理的源)
 *   
 *         - 没有normal，则将args作为整个loader处理(build)流程的结果(result)
 *   
 *         - normal的参数为args(经过this.raw转化)
 * 
 *    - 没有返回值
 * 
 *      - 继续往前执行，直到normal阶段，buffer作为流程处理的源
 * 
 *      - 按照规范，最后一个loader的结果的mate（sourceMap）字段会被保留
 * 
 */