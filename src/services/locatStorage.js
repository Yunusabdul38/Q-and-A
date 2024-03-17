const getLocalstorage = ()=>{
    return localStorage.getItem("Localuser")
}
const setLocalstorage = (data)=>{
    return localStorage.setItem("Localuser",JSON.stringify(data))
}
const clearLocalstorage = ()=>{
    return localStorage.removeItem("Localuser")
}
export {getLocalstorage,setLocalstorage,clearLocalstorage}