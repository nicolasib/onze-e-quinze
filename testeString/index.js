const cardapio = `
SEMANA 2

Feijão

vermelho, carioca, carioca, preto, carioca, tutu simples

Prato principal

linguiça ao molho, bife de frango acebolado, peixe ao molho vermelho, bife de boi grelhado, cubos suínos ao molho barbecue, isca de frango grelhada

Guarnição

virado de cenoura, macarrão parafuso ao alho e óleo, purê de batata, couve-flor gratinada, berinjela napolitano, baroa cozida

Vegetariano

omelete de espinafre, hambúrguer de feijão preto, soja oriental, bolinho de grão-de-bico, quibe de soja, suflê de legumes

Sobremesa

doce de banana (tablete), mamão, banana, maçã, melancia, gelatina

SEMANA 3

Feijão

carioca, preto, vermelho, carioca, carioca, carioca

Prato principal

fricassé de frango, lombo ao molho, frango assado(coxa e sobrecoxa), carne de penela, isca de frango grelhada, isca bovina

Guarnição

cenoura sauté, virado de couve, quiabo ao molho, legumes assados, brócolis ao molho branco, batata doce assada

Vegetariano

hambúrguer de lentilha, ovos poché, grão-de-bico refogado, bife de milho, lasanha de berinjela, torta de abobrinha

Sobremesa

doce de goiaba, laranja, maçã, melancia, banana, doce de amendoim

SEMANA 4

Feijão

carioca

Prato principal

filé de frango grelhado

Guarnição

creme de milho

Vegetariano

soja acebolada

Sobremesa

paçoca
`;

const contador = 2

const data = Date(Date.now())
let day

if(data.indexOf('Mon') !== -1){
    day = 0
}else if(data.indexOf('Tue') !== -1){
    day = 1
}else if(data.indexOf('Wed') !== -1){
    day = 2
}else if(data.indexOf('Thu') !== -1){
    day = 3
}else if(data.indexOf('Fri') !== -1){
    day = 4
}else if(data.indexOf('Sat') !== -1){
    day = 5
}else if(data.indexOf('Sun') !== -1){
    if(contador+1 === 5) contador = 1
    day = 6

}

const indiceSemanaAtual = cardapio.indexOf(`SEMANA ${contador}`)
const indiceProximaSemana = cardapio.indexOf(`SEMANA ${contador+1}`)

const semanaAtual = cardapio.slice(indiceSemanaAtual, indiceProximaSemana)

const feijao = semanaAtual.slice(
    semanaAtual.indexOf('Feijão')+6,
    semanaAtual.indexOf('Prato principal')
)

const pratoPrincipal = semanaAtual.slice(
    semanaAtual.indexOf('Prato principal')+15,
    semanaAtual.indexOf('Guarnição')
)

const guarnicao = semanaAtual.slice(
    semanaAtual.indexOf('Guarnição')+9,
    semanaAtual.indexOf('Vegetariano')
)

const vegetariano = semanaAtual.slice(
    semanaAtual.indexOf('Vegetariano')+11,
    semanaAtual.indexOf('Sobremesa')
)

const sobremesa = semanaAtual.slice(
    semanaAtual.indexOf('Sobremesa')+9
)

const arrayFeijao = formatArray(feijao)
const arrayPrato = formatArray(pratoPrincipal)
const arrayGuarnicao = formatArray(guarnicao)
const arrayVegetariano = formatArray(vegetariano)
const arraySobrememsa = formatArray(sobremesa)

console.log(`É feijão ${arrayFeijao[day]}`)
console.log(`Prato principal: ${arrayPrato[day]}`)
console.log(`Opção vegetariana: ${arrayVegetariano[day]}`)
console.log(`Guarnição é: ${arrayGuarnicao[day]}`)
console.log(`E a sobremesa é ${arraySobrememsa[day]}`)

//Seta o array com o prato para cada dia da semana de 0 a 5
//0 Segunda e 5 Sábado
function formatArray(string){
    let array = string.split(',')
    const aux = []

    array.forEach(element => {
        aux.push(element.trim())
    })

    return aux
}

let dadosFinais = {
    feijao: arrayFeijao[day],
    pratoPrincipal: arrayPrato[day],
    vegetariano: arrayVegetariano[day],
    guarnicao: arrayGuarnicao[day],
    sobremesa: arraySobrememsa[day]
}

if(day === 6) dadosFinais = {
    domingo: "Hoje não tem almoço :("
}


module.exports = dadosFinais