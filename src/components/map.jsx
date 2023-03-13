import React, { useEffect } from 'react';
import styled from 'styled-components';

import navigator from 'geolocation';

const { kakao } = window;

export default function Map() {
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        const now = new Date();
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              err: 0,
              time: now.toLocaleTimeString(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          err => {
            resolve({
              err: -1,
              latitude: -1,
              longitude: -1,
            });
          },
          { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
        );
      } else {
        reject({ error: -2, latitude: -1, longitude: -1 });
      }
    });
  }
  return (
    <div>
      <MapContainer id='map' />
    </div>
  );
}

const MapContainer = styled.div`
  width: 1200px;
  height: 1200px;
`;
