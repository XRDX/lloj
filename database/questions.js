module.exports = {
    0: { title: '编程练习I: 加法运算',
        description: [
            "观察下面的输入及输出值，可以看出输出值是输入值的和，下面我们就来写一个函数add(x1,x2)，使得函数的返回值等于输入值的和。", 
            "在JavaScript中，使用function来定义函数，使用return来返回结果。",
            "点击【提交】来执行你的代码"
        ],
        default_code: "function add(x1, x2){\n    var sum = x1 + x2;\n    return sum;\n}\n",
        tests:[ {x1: 2,  x2: 2,  y: 4,  ret:null},
            {x1: 3,  x2: 2,  y: 5,  ret:null},
            {x1: 12, x2: 12, y: 24, ret:null},
            {x1: 54, x2: 21, y: 75, ret:null}
        ],
        function_name: "add"
    },
    1: { title: '编程练习II: 减法运算',
        description: [
            "观察下面的输入及输出值，可以看出输出值是第一个数减去第二个数的值，下面我们就来写一个函数sub(x1,x2)，使得函数的返回值等于输入值的差。", 
            "不用担心数的大小问题"
        ],
        default_code: "function sub(x1, x2){\n    \/\/write your code here.\n    \n}\n",
        tests:[
        {x1: 2,  x2: 2,  y: 0,  ret:null},
        {x1: 3,  x2: 2,  y: 1,  ret:null},
        {x1: 12, x2: 12, y: 0, ret:null},
            {x1: 54, x2: 21, y: 33, ret:null}
        ],
        function_name: "sub"            
    },
    2: { title: '编程练习III: 乘法运算',
        description: [
            "观察下面的输入及输出值，可以看出输出值是输入值的积，下面我们就来写一个函数mul(x1,x2)，使得函数的返回值等于输入值的乘积。", 
            "用*号作为乘号"
        ],
        default_code: "function mul(x1, x2){\n    \/\/write your code here.\n    \n}\n",
        tests:[
        {x1: 2,  x2: 2,  y: 4,  ret:null},
        {x1: 3,  x2: 2,  y: 6,  ret:null},
        {x1: 12, x2: 12, y: 144, ret:null},
            {x1: 54, x2: 21, y: 1134, ret:null}
        ],
        function_name: "mul"            
    },
    3: { title: '水仙花数',
        description: [
            "如果一个三位数的百分位、十分位、个位的三次方之和等于这个三位数，那么这个数就称为水仙花数", 
            "写一个函数isNarcissusNumber(x)，来判断一个数是不是水仙花数"
        ],
        default_code: "function isNarcissusNumber(x){\n    \/\/write your code here.\n    \n}\n",
        tests:[
        {x1: 100,  y: false,  ret:null},
        {x1: 153,  y: true,  ret:null},
        {x1: 678, y: false, ret:null},
            {x1: 371, y: true, ret:null}
        ],
        function_name: "isNarcissusNumber"            
    },
    4: { title: '质数',
        description: [
            "如果一个数只能被1和自身整除，那么这个数就是一个质数", 
            "写一个函数isPrimeNumber(x)，来判断一个数是不是质数"
        ],
        default_code: "function isPrimeNumber(x){\n    \/\/write your code here.\n    \n}\n",
        tests:[
        {x1: 4,  y: false,  ret:null},
        {x1: 7,  y: true,  ret:null},
        {x1: 9, y: false, ret:null},
            {x1: 13, y: true, ret:null}
        ],
        function_name: "isPrimeNumber"            
    },
    5: { title: '平均数',
        description: [
            "给出两个数字，计算平均值", 
            "函数名称命名为average，带两个参数"
        ],
        default_code: "function average(x1, x2){\n    \/\/write your code here.\n    \n}\n",
        tests:[
            {x1: 4,  x2: 4, y: 4,  ret:null},
            {x1: 7,  x2: 5, y: 6,  ret:null},
            {x1: 9,  x2: 16, y: 12.5, ret:null},
            {x1: 13, x2: 35, y: 24, ret:null}
        ],
        function_name: "average"            
    }

}
