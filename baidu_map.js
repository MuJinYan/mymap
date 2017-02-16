/**
 * Created by Administrator on 2017/2/16.
 */




function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=a8aSKDHlXLBwAAZjgQS7dX9xDHHPG6aC&callback=init";
    document.body.appendChild(script);
}
function init() {
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺
    // 添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
    });

    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("您当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError",function(e){
        // 定位失败事件
        alert(e.message);
    });

    /*浏览器定位*/
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), 11);
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true});


    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.addControl(bottom_left_control);//添加比例尺
    map.addControl(navigationControl);//添加带有定位的导航按钮
    map.addControl(geolocationControl);//添加定位
}
window.onload = loadJScript;  //异步加载地图
