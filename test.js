/**
 * Created by zhangshengfeng on 2019/11/4.
 */
alert("test34")

var bgaudio = document.getElementById('bgMusic');
//document.getElementById('bgaudio').play();
document.addEventListener("WeixinJSBridgeReady",
    function () {
        document.getElementById('bgMusic').play();
    },
    false);