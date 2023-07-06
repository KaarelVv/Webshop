import React from 'react'
import { useEffect, useState } from 'react'
import config from '../../data/config.json';

function ParcelMachines() {
  const [parcelMachines, setParcelMachines] = useState({});

  useEffect(() => {
    // PAKIAUTOMAADID BACK-ENDIST
    fetch(config.backendUrl + "/parcel-machines/EE")
      .then(res => res.json())
      .then(json => {
        setParcelMachines(json);
        // console.log(typeof parcelMachines);
      })
  }, []);

  return (
    <div>
      <select >
        <option value="">Omniva pakiautomaat</option>
        {parcelMachines.omnivaParcelMachines?.map(parcel => (
          <option key={parcel.NAME}>{parcel.NAME}</option>
        ))}
      </select>
      <select >
        <option value="">Smartpost pakiautomaat</option>
        {parcelMachines.smartpostParcelMachines?.map(parcel => (
          <option key={parcel.name}>{parcel.name}</option>
        ))}
      </select>
    </div>
  )
}

export default ParcelMachines