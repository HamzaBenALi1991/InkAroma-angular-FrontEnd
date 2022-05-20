export var regexPhone = /^[0-9]{5,10}$/
export var regexPseudo = /^(?!\s)[a-zA-Z0-9_\s-]{2,20}$/
export var regexEmail = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
export var regexName = /^[a-zA-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/