import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";

function Legend({ map }) {
  console.log(map);
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        /*
        div.innerHTML =
          "<h4>This is the legend</h4>" +
          "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
          */
        div.innerHTML += "<h4>Ubicación</h4>";
        div.innerHTML += '<i class="icon" style="background-image: url(/img/container.png);background-repeat: no-repeat;"></i><span>Contenedores</span><br>';
        div.innerHTML += '<i class="icon" style="background-image: url(/img/clothes.png);background-repeat: no-repeat;"></i><span>Tiendas Aliadas</span><br>';
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
