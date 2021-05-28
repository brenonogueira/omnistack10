//isolando funcionamento de uma função para não ficar repetida dentro dos arquivos

module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()) //trim() remove espaços antes e depois de uma string
}