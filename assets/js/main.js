const optionsSelect = document.querySelectorAll('[data-option]')
const sectionsTopic = document.querySelectorAll('.section_disp_topic')
const headBtns = document.querySelectorAll('[data-headButton]')
const dispSections = document.querySelectorAll('.section_main')

const input = document.getElementById('password')
const maiusculaInput = document.querySelector('.maiuscula_minuscula')
const caractereInput = document.querySelector('.caractere_especial')
const numeroInput = document.querySelector('.numeros_input')
const senhaCompleta = document.querySelector('.senha_completa')

const eyesInput = document.querySelectorAll('.eye_input')

eyesInput.forEach(eye => eye.addEventListener('click', event => {
    eyesInput.forEach( elemento => elemento.classList.remove('hidden'))
    eye.classList.add('hidden')
    mudarVisualizacaoInput()
}))

function mudarVisualizacaoInput() {
    if (input.type === "password") {
      input.type = "text";
    } else {
    input.type = "password";
    }
}


optionsSelect.forEach( option => {
    option.addEventListener('click', event => {
        optionsSelect.forEach( optionHidden => optionHidden.classList.remove('selected_option'))

        option.classList.add('selected_option')
        
        sectionsTopic.forEach( section => {
            section.classList.add('hidden')
    
            if(section.id == option.dataset.option){
                
                section.classList.remove('hidden')
            }
        })
    })
})


headBtns.forEach ( btn => {

    btn.addEventListener('click', event => {
        
        dispSections.forEach( sectionDisp => sectionDisp.classList.add('hidden'))

        const section = document.querySelector(`.${btn.dataset.headbutton}`)
  
        section.classList.remove('hidden')

        if(section.children[1].className == 'container_manage'){
            section.children[1].firstChild.nextElementSibling.classList.add('selected_option')
            section.children[1].nextElementSibling.classList.remove('hidden')
        }

        window.scrollTo(0, window.innerHeight + 100)
    })
})


input.addEventListener('change', () => {
    let senha = input.value
    console.log(senhaValida(senha))
})

function senhaValida(p){
    senhaCompleta.classList.add('hidden')
    maiusculaInput.classList.add('hidden')
    numeroInput.classList.add('hidden')
    caractereInput.classList.add('hidden')

    let retorno = false;
    let letrasMaiusculas = /[A-Z]/;
    let letrasMinusculas = /[a-z]/; 
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    let auxMaiuscula = 0;
    let auxMinuscula = 0;
    let auxNumero = 0;
    let auxEspecial = 0;

    for(var i=0; i<p.length; i++){
        if(letrasMaiusculas.test(p[i]))
            auxMaiuscula++;
        else if(letrasMinusculas.test(p[i]))
            auxMinuscula++;
        else if(numeros.test(p[i]))
            auxNumero++;
        else if(caracteresEspeciais.test(p[i]))
            auxEspecial++;
    }

    if (auxMaiuscula > 0){

        if (auxMinuscula > 0){
            if (auxNumero > 0){
                if (auxEspecial) {
                    retorno = true;
                    maiusculaInput.classList.add('hidden')
                    caractereInput.classList.add('hidden')
                    numeroInput.classList.add('hidden')
                    senhaCompleta.classList.remove('hidden')
                    input.parentElement.style.border = '1px solid green'
                } else {
                    caractereInput.classList.remove('hidden')
                    maiusculaInput.classList.add('hidden')
                    numeroInput.classList.add('hidden')
                    input.parentElement.style.border = '1px solid red'
                }
            } else {
                numeroInput.classList.remove('hidden')
                maiusculaInput.classList.add('hidden')
                input.parentElement.style.border = '1px solid red'

                if(auxNumero == 0) {
                    numeroInput.classList.remove('hidden')
                } 
                if(auxEspecial == 0) {
                    caractereInput.classList.remove('hidden')
                }
            }
        } else {
            maiusculaInput.classList.remove('hidden')
            input.parentElement.style.border = '1px solid red'

            if(auxNumero == 0) {
                numeroInput.classList.remove('hidden')
            } 
            if(auxEspecial == 0) {
                caractereInput.classList.remove('hidden')
            }
        }
        
    } else {
        maiusculaInput.classList.remove('hidden')
        input.parentElement.style.border = '1px solid red'

        if(auxNumero == 0) {
            numeroInput.classList.remove('hidden')
        } 
        if(auxEspecial == 0) {
            caractereInput.classList.remove('hidden')
        }
    } 
    
    return retorno;
}