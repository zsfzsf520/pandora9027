/**
 * Created by zhangshengfeng on 2019/8/24.
 */
(function (log) {
    let V = "10162230";
    let userData = {
        username: null,
        question_1: [],
        question_2: [],
        question_3: [],
        question_4: [],
        question_5: [],
    };
    let ANS = [
        [1, 2],
        [1, 2, 3],
        [1],
        [3],
        [1, 2, 3, 4, 5, 6],
    ];
    let OPENID = null;
    let DOWNAPP = "https://m.exexm.com/download/v3.html";

    function upData() {
        //log($(".page2Contet .questionBox>.active"))
        let data = {
            username: $(".page1Contet input").val(),
            sex: $(".sexBtnActive").data("id"),
            question_1: [$(".page2Contet .questionBox>.active").data("id")],
            question_2: [$(".page3Contet .questionBox>.active").data("id")],
            question_3: [$(".page4Contet .questionBox>.active").data("id")],
            question_4: [$(".page5Contet .questionBox>.active").data("id")],
            question_5: [],
        }
        let page6Contet = $(".page6Contet .questionBox>.active");
        for (let id = 0; id < page6Contet.length; id++) {

            data.question_5.push($(page6Contet[id]).data("id"))
        }
        log(data);
        //return false;
        $.ajax({
            url: "https://www.jwnice.com/jyserver/wukong/index.php/crm/question/save",
            type: "POST",

            headers: {
                //'Content-Type': 'application/json',
                Accept: "application / json; version=1.0",

                //Authorization: g_info.user.token,  //参数
            },
            //data: JSON.stringify({
            //    "method": "reset",
            //
            //
            //}),
            data: data,
            success: function (res) {

                log("reset=======end", res)


            }
        })
    }

    function canvas(ele, call) {//ele 为带id值，
        var canvas = document.createElement("canvas");
        //默认生成的 canvas 图片在 retina 设备上显示很模糊，处理成 2 倍图能解决这个问题：
        var w = $(ele).width();
        var h = $(ele).height();
        log(w, h)

//要将 canvas 的宽高设置成容器宽高的 2 倍

        canvas.width = w * 4;
        canvas.height = h * 4;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        var context = canvas.getContext("2d");
//然后将画布缩放，将图像放大两倍画到画布上
        context.scale(4, 4);

        html2canvas(document.querySelector(ele), {
            canvas: canvas,
            useCORS: true,
            logging: true,
            //backgroundColor: "rgba(0,0,0,0)"
        }).then(canvas => {
            call(canvas.toDataURL("image/jpeg", 0.8))
        });
    }

    function loading(target, call) {

        //bdtj("loading");


        log("loading");


        let lazyLoad = $(target + " .lazyLoad");
        let lazyLoadLen = lazyLoad.length;
        let lazyLoadNum = 0;
        if (lazyLoadLen == 0) {
            call(100);
        } else {
            lazyLoad.each(function () {
                this.src = $(this).data("src") + "?v=" + V;
                $(this).on("load", function () {
                    lazyLoadNum++;
                    $(this).off("load");
                    let _currtP = lazyLoadNum / lazyLoadLen;
                    call(_currtP * 100)
                })

            });
        }

        //startGame();
    }

    function get_length(s) {
        var char_length = 0;
        for (var i = 0; i < s.length; i++) {
            //var son_char = s.charAt(i);
            //encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;

            var c = s.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                char_length += 0.5;
            }
            else {
                char_length += 1;
            }
            log("C--", c)
        }
        log(char_length)
        return char_length;
    }

    function cut_str(str, len) {
        var char_length = 0;
        for (var i = 0; i < str.length; i++) {
            //var son_str = str.charAt(i);
            //encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                char_length += 0.5;
            }
            else {
                char_length += 1;
            }
            if (char_length >= len) {
                var sub_len = char_length == len ? i + 1 : i;
                return str.substr(0, sub_len);
                break;
            }
        }
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    function setLoad(p) {
        $(".sl,.moveLineBox").css("right", (100 - p) + "%");
        $('.loadW1').hide();
        $('.loadW2').hide();
        $('.loadW3').hide();
        var num1 = Math.floor(p % 10);
        var num2 = Math.floor(p / 10);
        //log("p===",p,num1,num2)

        if (p >= 100) {
            $($(".loadW").find(".loadW1")[1]).show();
            $($(".loadW").find(".loadW2")[0]).show();
            $($(".loadW").find(".loadW3")[0]).show();
        } else if (p > 9) {
            $($(".loadW").find(".loadW3")[num1]).show();
            $($(".loadW").find(".loadW2")[num2]).show();
        } else {
            $($(".loadW").find(".loadW3")[num1]).show();
        }
    };
    function getUserData(call) {
        //userData.question_1=[$(".p3 .box>.ansTipActive").data("id")];
        //userData.question_2=[$(".p4 .box>.ansTipActive").data("id")];
        //userData.question_3=[$(".p5 .box>.ansTipActive").data("id")];
        //userData.question_4=[$(".p6 .box>.ansTipActive").data("id")];
        //userData.question_5=[$(".p7 .box>.ansTipActive").data("id")];
        $(".p3 .box>.ansTipActive").each(function () {
            console.log("=====", $(this).data("id"))
            userData.question_1.push($(this).data("id"))
        });
        $(".p4 .box>.ansTipActive").each(function () {
            console.log("=====", $(this).data("id"))
            userData.question_2.push($(this).data("id"))
        });
        $(".p5 .box>.ansTipActive").each(function () {
            console.log("=====", $(this).data("id"))
            userData.question_3.push($(this).data("id"))
        });
        $(".p6 .box>.ansTipActive").each(function () {
            console.log("=====", $(this).data("id"))
            userData.question_4.push($(this).data("id"))
        });
        $(".p7 .box>.ansTipActive").each(function () {
            console.log("=====", $(this).data("id"))
            userData.question_5.push($(this).data("id"))
        });
        console.log("userData======", userData)
        $.ajax({
            url: "https://www.jwnice.com/jyserver/question/index.php/crm/question/save",
            type: "POST",

            headers: {
                Accept: "application / json; version=1.0",
            },

            data: {

                openid: OPENID,
                username: $(".nameInput input").val(),
                sex: 3,
                question_1: userData.question_1,
                question_2: userData.question_2,
                question_3: userData.question_3,
                question_4: userData.question_4,
                question_5: userData.question_5,
            },
            success: function (res) {

                log("reset=======end", res)
                //alert(JSON.stringify(res));
                call();

            }
        })

    };
    function setHb(call) {
        console.log("setHb", userData)
        let score = 0;
        if (userData.question_1.length == ANS[0].length) {
            let isOk = true;
            for (let [index, elem] of userData.question_1.entries()) {
                if (elem != ANS[0][index]) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                score += 20;
            }

        }
        if (userData.question_2.length == ANS[1].length) {
            let isOk = true;
            for (let [index, elem] of userData.question_2.entries()) {
                if (elem != ANS[1][index]) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                score += 20;
            }
        }
        if (userData.question_3.length == ANS[2].length) {
            let isOk = true;
            for (let [index, elem] of userData.question_3.entries()) {
                if (elem != ANS[2][index]) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                score += 20;
            }
        }
        if (userData.question_4.length == ANS[3].length) {
            let isOk = true;
            for (let [index, elem] of userData.question_4.entries()) {
                if (elem != ANS[3][index]) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                score += 20;
            }
        }
        if (userData.question_5.length == ANS[4].length) {
            let isOk = true;
            for (let [index, elem] of userData.question_5.entries()) {
                if (elem != ANS[4][index]) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                score += 20;
            }
        }
        let num = Math.floor(score / 20) + 1;
        $(".bgBox" + num).show();
        $(".bgBox" + num + "_hb").show();
        canvas(".p8 .bgBox" + num, function (url) {
            console.log(url)
            $(".showBox>.bg").attr("src", url);
            canvas(".p8 .bgBox" + num + "_hb", function (url) {
                console.log(url)
                $(".saveImg").attr("src", url);
                $(".saveImg").show();
                $(".waiting").hide();
                if (call) {
                    call();
                }
            })

        })
    };
    setLoad(0);
    loading("#loadPage", function (p) {
        if (p == 100) {
            loading("#mainContent", function (p) {
                //log(p)
                let intP = parseInt(p) * 0.9;
                setLoad(intP);


                if (intP == 90) {
                    window.gg.wxUser.getUserInfo(function (res) {
                        if (res) {
                            OPENID = res.openid;
                        } else {
                            OPENID = getQueryString("openid")
                        }

                        $.ajax({
                            url: "https://www.jwnice.com/jyserver/question/index.php/crm/question/user",
                            type: "POST",

                            headers: {
                                Accept: "application / json; version=1.0",
                            },
                            data: {
                                openid: OPENID
                            },
                            success: function (res) {
                                //alert("res===="+JSON.stringify(res));
                                let hasJosin = false;
                                if (res.data.openid) {
                                    hasJosin = true;
                                    let data = res.data;
                                    userData.username = data.username;
                                    userData.question_1 = data.question_1.split(",");
                                    userData.question_2 = data.question_2.split(",");
                                    userData.question_3 = data.question_3.split(",");
                                    userData.question_4 = data.question_4.split(",");
                                    userData.question_5 = data.question_5.split(",");
                                    $(".p8 .name").text(userData.username);
                                    //alert("userData==111=="+JSON.stringify(userData))
                                }
                                let code = Number(res.code);
                                setLoad(95);


                                var mySwiper = new Swiper('.swiper-container', {
                                    direction: 'vertical', // 垂直切换选项
                                    speed: 300,
                                    preventInteractionOnTransition: true,
                                    allowSlidePrev: true,
                                    allowSlideNext: true,
                                    on: {
                                        init: function () {


                                            //this.slideNext();
                                            if (hasJosin) {
                                                this.slideTo(7);
                                            } else {
                                                setLoad(100);
                                                setTimeout(function () {
                                                    $("#loadPage").hide();
                                                }, 500);

                                            }
                                            //return false;
                                        },
                                        touchStart: function (event) {
                                            console.log("touchStart")
                                            this.allowSlidePrev = false;
                                            //this.slideTo(1)
                                        },
                                        //touchEnd: function(event){
                                        //    console.log("touchEnd")
                                        //    this.allowSlidePrev = true;
                                        //    //this.slideTo(1)
                                        //},
                                        touchEnd: function (event) {
                                            console.log("touchEnd")
                                            this.allowSlidePrev = true;
                                            //this.slideTo(1)
                                        },
                                        slideNextTransitionStart: function () {
                                            console.log("slideNextTransitionStart")
                                            $(".subBtn").hide();
                                        },

                                        slideNextTransitionEnd: function () {
                                            console.log("slideNextTransitionEnd")
                                            this.allowSlideNext = false;
                                            //this.allowTouchMove = false;
                                            this.allowSlidePrev = false;
                                            //$(".noSwiper").show();
                                            this.allowTouchMove = true;
                                            if (this.activeIndex == 1) {
                                                this.allowTouchMove = false;
                                                $(".nameInput input").val('');
                                                $(".p8 .name").text(null);
                                                //let inputVal;
                                                $(".nameInput input").off("input porpertychange'");
                                                $(".nameInput input").on("input porpertychange'", function () {
                                                    let inputVal = $(this).val();
                                                    //$(".p8 .name").text(inputVal);
                                                    log("inputVal", inputVal)

                                                    if (get_length(inputVal) > 4) {
                                                        mySwiper.allowSlideNext = true;
                                                        let val = cut_str(inputVal, 4);
                                                        $(".nameInput input").val(val);
                                                        $(".p8 .name").text(val);
                                                        $(".wordTipDialog").show();
                                                        //alert("最多输入4个汉子或8个英文")

                                                    } else if (get_length(inputVal) > 0) {
                                                        mySwiper.allowSlideNext = true;
                                                        $(".p8 .name").text(inputVal);
                                                        //$(".noSwiper").hide();
                                                        //$(".jiantouTip").show();
                                                    } else {
                                                        mySwiper.allowSlideNext = false;
                                                        $(".p8 .name").text(inputVal);

                                                        alert("请输入姓名")
                                                        //$(".noSwiper").show();
                                                        //$(".jiantouTip").hide();
                                                    }
                                                });
                                                $(".wordTipDialog .closeBtn").on("click", function () {
                                                    $(".wordTipDialog").hide();
                                                });
                                                $(".p2 .btn").on("click", function () {
                                                        let name = $(".p8 .name").text();
                                                        if (name.length == 0) {
                                                            alert("请输入姓名!")
                                                            return false;
                                                        }
                                                        //$('.nameInput input').focus();
                                                        setTimeout(function () {
                                                            mySwiper.slideNext()
                                                        }, 500)
                                                    }
                                                )
                                            } else if (this.activeIndex == 7) {
                                                $(".bgBox").hide();
                                                //$(".waiting").hide();
                                                //$(".bgBoxShow").hide();
                                                if (!hasJosin) {
                                                    getUserData(setHb);
                                                    $(".waiting").show();
                                                } else {
                                                    setHb(function () {
                                                        setLoad(100);
                                                        setTimeout(function () {
                                                            $("#loadPage").hide();
                                                        }, 500);
                                                    });
                                                }


                                            }
                                            console.log("this.activeIndex", this.activeIndex, this.allowSlidePrev)

                                        },
                                    },
                                })

                                $(".shareBtn").on('click', function () {
                                    //alert("分享提示")
                                    $(".shareTip").show();
                                });
                                $(".shareTip .closeBtn").on('click', function () {
                                    //alert("分享提示")
                                    $(".shareTip").hide();
                                });
                                $(".downBtn").on("click", function () {
                                    //alert("下载");
                                    //var u = navigator.userAgent;
                                    //
                                    //if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                                    //
                                    //    window.location.href = DOWNAPP.andr;
                                    //
                                    //} else if (u.indexOf('iPhone') > -1) {
                                    //    window.location.href = DOWNAPP.ios;
                                    //
                                    //} else {
                                    //    alert("请使用安卓或ios系统")
                                    //}
                                    $(".downPage").show();
                                });
                                $(".downAppBtn").on("click",function(){
                                    window.location.href=DOWNAPP;
                                });
                                $(".downPage .closeBtn").on("click",function(){
                                    $(".downPage").hide();
                                });
                                $(".ans").on("click", function () {
                                    if ($(this).hasClass("ansTipActive")) {
                                        $(this).removeClass("ansTipActive");
                                        if ($(this).parent().find(".ansTipActive").length == 0) {
                                            //mySwiper.allowSlideNext = false;
                                            //$(".noSwiper").show();
                                            $(".subBtn").hide();
                                        }
                                    } else {
                                        $(this).addClass("ansTipActive");
                                        //mySwiper.allowSlideNext = true;
                                        //mySwiper.slideNext();
                                        // $(".noSwiper").hide();
                                        $(".subBtn").show();
                                    }
                                    //$(".p3 .box>.ansTipActive").each(function(){
                                    //    console.log("=====",$(this).data("id"))
                                    //})
                                    //console.log("--------",$(".p3 .box>.ansTipActive"),$(".p3 .box>.ansTipActive").data("id"))

                                })
                                $(".ans1").on("click", function () {
                                    if ($(this).hasClass("ansTipActive")) {
                                        $(this).removeClass("ansTipActive");
                                        if ($(this).parent().find(".ansTipActive").length == 0) {
                                           // mySwiper.allowSlideNext = false;
                                            //$(".noSwiper").show();
                                            //$(".jiantouTip").hide();
                                            $(".subBtn").hide();
                                        }
                                    } else {
                                        $($(this).parent().find(".ansTipActive")).removeClass("ansTipActive");
                                        $(this).addClass("ansTipActive");
                                        //mySwiper.allowSlideNext = true;
                                        //mySwiper.slideNext();
                                        //$(".noSwiper").hide();
                                        $(".subBtn").show();
                                    }
                                })
                                $(".subBtn").on("click", function () {
                                    //console.log("subBtn--------",$(this).data("id"))
                                    let id = Number($(this).data("id")) - 1;
                                    let ansOkArr = ANS[id];
                                    console.log(ANS[id])
                                    let ansArr = [];
                                    //$(".p" + (id + 3) + " .box .tipImg2").hide();
                                    //$(".p" + (id + 3) + " .box .tipImg").show();
                                    $(".p" + (id + 3) + " .box>.ansTipActive").each(function () {
                                        console.log("=====", $(this).data("id"))
                                        ansArr.push(Number($(this).data("id")))
                                    });
                                    if (ansOkArr.length != ansArr.length) {
                                        console.log("err")
                                        $(".nextPage").show();
                                        $(".ansErr").show();
                                        $(".ansOk").hide();
                                    } else {
                                        let ansOk = true;
                                        for (let num = 0; num < ansOkArr.length; num++) {
                                            if (ansOkArr[num] != ansArr[num]) {
                                                ansOk = false;
                                            }
                                        }
                                        if (!ansOk) {
                                            console.log("err")
                                            $(".nextPage").show();
                                            $(".ansErr").show();
                                            $(".ansOk").hide();
                                        } else {
                                            console.log("ok")
                                            $(".nextPage").show();
                                            $(".ansErr").hide();
                                            $(".ansOk").show();
                                        }
                                    }
                                });
                                $(".nextPage .nexBtn,.nextPage .closeBtn").on("click", function () {
                                    $(".nextPage").hide();
                                    mySwiper.allowSlideNext = true;
                                    mySwiper.slideNext();
                                });
                            }

                        })

                    });
                }
            })
        }
    })

    var w = document.documentElement.clientWidth || document.body.clientWidth;
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    if (w / h > 750 / 1334) {
        console.log(h, h / (w * (1334 / 750)))
        $(".showBox").css({
            'transform': `scale(${h / (w * (1334 / 750))})`
        })
        $(".p3.box,.p4.box,.p5.box,.p6.box,.p7.box").css({
            'transform': `scale(${h / (w * (1334 / 750))})`
        })
    }

    let slNum = 1;
    let sltimer = window.setInterval(function () {
        $(".sl>img").hide();
        $(`.sl>img:nth-child(${slNum})`).show();
        slNum++;
        if (slNum >= 7) {
            slNum = 1;
        }
    }, 300);
    $(".music").on('click', function () {
        $($(".music").find("img")).hide();
        let id = Number($(".music").data("id"));
        if (id == 1) {
            $(".music").data("id", 0)
            $($(".music").find("img")[1]).show();
            $("#bgMusic")[0].pause();
        } else {
            $(".music").data("id", 1)
            $($(".music").find("img")[0]).show();
            $("#bgMusic")[0].play();
        }
    })

    let zNum = 1;
    let ztimer = window.setInterval(function () {
        $(".zBox>img").hide();
        $(`.zBox>img:nth-child(${zNum})`).show();
        zNum++;
        if (zNum >= 5) {
            zNum = 1;
        }
    }, 300);
    let num = 1;

    let xtimer = window.setInterval(function () {
        $(".xianBox>img").hide();
        $(`.xianBox>img:nth-child(${Math.floor(num / 22 % 4) + 1})`).show();
        $(".p3 .lhBox>img").hide();
        $(`.p3 .lhBox>img:nth-child(${Math.floor(num / 60 % 2) + 1})`).show();

        $(".p3 .girlBox>img").hide();
        $(`.p3 .girlBox>img:nth-child(${Math.floor(num / 30 % 4) + 1})`).show();

        $(".p4 .lbBox>img").hide();
        $(`.p4 .lbBox>img:nth-child(${Math.floor(num / 30 % 3) + 1})`).show();

        $(".p5 .book>img").hide();
        $(`.p5 .book>img:nth-child(${Math.floor(num / 50 % 2) + 1})`).show();

        $(".p5 .gilr>img").hide();
        $(`.p5 .gilr>img:nth-child(${Math.floor(num / 30 % 3) + 1})`).show();

        $(".p6 .bi>img").hide();
        $(`.p6 .bi>img:nth-child(${Math.floor(num / 30 % 4) + 1})`).show();

        $(".p6 .star>img").hide();
        $(`.p6 .star>img:nth-child(${Math.floor(num / 20 % 2) + 1})`).show();

        $(".p7 .mf>img").hide();
        $(`.p7 .mf>img:nth-child(${Math.floor(num / 32 % 3) + 1})`).show();

        $(".p7 .rb>img").hide();
        $(`.p7 .rb>img:nth-child(${Math.floor(num / 40 % 3) + 1})`).show();
        $(".p7 .lb>img").hide();
        $(`.p7 .lb>img:nth-child(${Math.floor(num / 30 % 3) + 1})`).show();

        $(".jiantouTip12>img").hide();
        $(`.jiantouTip12>img:nth-child(${Math.floor(num / 50 % 2) + 1})`).show();

        $(".dianBox>img").hide();
        $(`.dianBox>img:nth-child(${Math.floor(num / 50 % 3) + 1})`).show();

        num++;
    }, 10);


    var close = true;
    document.body.addEventListener('focusout', () => {
        //软键盘收起的事件处理
        close = true;
    });

    $("input").focus(function () {
        close = false;
    }).blur(function () {
        setTimeout(function () {
            if (close) {
                document.body.scrollIntoView();
            }
        }, 200);
    });


})(console.log);
