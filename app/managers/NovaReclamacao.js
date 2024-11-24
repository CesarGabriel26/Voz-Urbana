import getLatLongFromAddress from "../utils/permissions/LocationPermtion";

export async function onAddressSubmit(data) {
    console.log('Submitted Data:', data);

    return await getLatLongFromAddress(
        data.Rua, 
        data.NumeroDoLocal, 
        data.Cidade, 
        data.Estado, 
        data.Pais
    )
};

