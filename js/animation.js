

/**匀速动画封装
 * @param: ele:元素
 * @param: target:目标位置
 */
function animationMove(ele,target){
    //1.先清除之前的定时器，以本次为准
    clearInterval(ele.timeID);
    //2.开始本次移动
    ele.timeID = setInterval(function(){
        //2.1 获取元素当前位置
        var currentLeft = ele.offsetLeft;
        //2.2 开始移动
        var isLeft = currentLeft <= target?true:false;
        isLeft?currentLeft += 10 : currentLeft -= 10;
        ele.style.left = currentLeft + 'px';
        //2.3 边界检测
        if(isLeft?currentLeft >= target:currentLeft <= target){
            //(1)停止定时器
            clearInterval(ele.timeID);
            //(2)元素复位
            ele.style.left = target + 'px';
        };
    },5);
};

function animationSlow(ele,attrs,fn){
    //1.清除以前的计时器
    clearInterval(ele.timeID);
    //2.开始本次计时器
    ele.timeID = setInterval(function(){
        //开关思想
        //a 提出假设
        var isAllOk = true;
        //b 验证假设
        //2.0遍历对象的属性
        for(var key in attrs){
            var attr = key;
            var target = attrs[key];
            if(attr == 'zIndex'|| attr == 'backgroundColor'){//层级&背景色直接改
                //层级没有动画
                ele.style[attr] = target;
            }else if(attr == 'opacity'){//透明度
                    //透明度2.1获取元素当前位置
                    //注意点：浮点精度丢失，需要放大100倍
                    var current = parseFloat(getComputedStyle(ele)[attr])*100;
                    target *= 100;
                    //透明度2.2计算本次距离
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    //透明度2.3开始移动
                    current += step;
                    ele.style[attr] = current/100;//透明度没有单位
                    //2.4终点检测
                    //假设不成立:只要有属性没有到达终点
                    if(current != target){
                        isAllOk = false;
                    };
            }else{
                //2.1获取当前位置
                var current = parseInt(getComputedStyle(ele)[attr]);
                //2.2计算本次距离
                var step = (target - current)/10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //2.3开始移动
                current += step;
                ele.style[attr] = current + 'px';//单位px
                //2.4终点检测
                    //假设不成立:只要有属性没有到达终点
                if(current != target){
                    isAllOk = false;
                };
            };
        };
        if(isAllOk){
            //c 根绝开关实现需求
            clearInterval(ele.timeID);
            //动画结束，开始执行回调函数
                //必须传函数才会执行
            if(typeof fn == 'function'){
                fn();
            };
        };
    }, 30);    
}; 
