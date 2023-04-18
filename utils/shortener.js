const sources = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

module.exports = (amount)=>{
  let result = ''
  for(let i = 0; i < amount; i++){
    let randomIndex = Math.floor(Math.random() * sources.length)
    result += sources[randomIndex]
  }
  return result
}