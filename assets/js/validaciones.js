
export function valida (input){
    const tipoDeInput  = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";

    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarmensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",

];


const mensajeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email:{
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: 
        "Debe contener entre 6 y 12 caracteres, al menos una mayuscula, al menos una minuscula , un numero y no se acepta caracteres especiales."

    },
    nacimiento: {
        valueMissing: "debes completar tu fecha de nacimiento",
        customError: "Debes tener al menos 18 años de edad"
    },

    numero:{
        valueMissing: "El campo numero de telefono no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX"
    },

    direccion: {
        valueMissing: "El campo direccion no puede estar vacio",
        patternMismatch: "El campo requiere al menos 10 caracteres hasta 40"
    },

    cuidad: {
        valueMissing: "El campo cuidad no puede estar vacio",
        patternMismatch: "El campo requiere al menos 10 caracteres hasta 40"
    },

    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El campo requiere al menos 10 caracteres hasta 40"
    }

}

const validadores = {
    nacimiento: input => validarNacimiento(input)
}

function mostrarmensajeDeError(tipoDeInput, input){
    let mensaje =""
tipoDeErrores.forEach(error => {
    if(input.validity[error]){

        
        console.log(error)
        console.log(input.validity[error])
        console.log (mensajeError[tipoDeInput][error])
        mensaje = mensajeError[tipoDeInput][error]
    }
})

    return mensaje;
}

function validarNacimiento(input){
 const fechaCliente = new Date (input.value);
 let mensaje = "";
 if (!mayorDeEdad(fechaCliente)){
    mensaje= "Debes tener al menos 18 años de edad";
 }

 input.setCustomValidity(mensaje);
 
}

function mayorDeEdad (fecha){
const fechaActual = new Date();

const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18, 
    fecha.getUTCMonth(), 
    fecha.getUTCDate()
    );

 return diferenciaFechas <= fechaActual;

}