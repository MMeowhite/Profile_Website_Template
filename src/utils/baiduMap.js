import React, { useState, useEffect } from "react";



const BaiduMap = ({ address }) => {
    const [center, setCenter] = useState({ lng: 104.068, lat: 30.623 }); // 默认的经纬度

    useEffect(() => {
        // 确保百度地图 API 加载完成后执行地图初始化
        const initMap = () => {
            // 创建地图实例
            const map = new window.BMap.Map("mapContainer");

            // 创建地理编码器
            const geocoder = new window.BMap.Geocoder();

            // 通过地址获取经纬度
            geocoder.getPoint(address, (point) => {
                if (point) {
                    // 地址成功转换为经纬度
                    setCenter({ lng: point.lng, lat: point.lat }); // 更新经纬度
                    map.centerAndZoom(point, 15); // 设置地图中心和缩放级别

                    // 在地图上添加一个标注
                    const marker = new window.BMap.Marker(point); // 创建标注
                    map.addOverlay(marker); // 将标注添加到地图上

                    // 可以为标注添加一些内容，如点击标注时显示的信息窗口
                    const infoWindow = new window.BMap.InfoWindow("四川大学"); // 信息窗口
                    marker.addEventListener("click", function () {
                        marker.openInfoWindow(infoWindow); // 点击标注时打开信息窗口
                    });
                } else {
                    alert("地址无法解析！");
                }
            }); // 可选：指定城市，百度会在这个城市范围内搜索地址
        };

        if (window.BMap) {
            initMap(); // 如果地图 API 已经加载，则直接初始化
        } else {
            // 若地图 API 未加载，监听加载事件
            window.onBMapLoad = initMap;
        }
    }, [address]);

    return (
        <div style={{ width: '100%', height: '100%', borderRadius: "16px" }} id="mapContainer"></div>
    );
};

export default BaiduMap;