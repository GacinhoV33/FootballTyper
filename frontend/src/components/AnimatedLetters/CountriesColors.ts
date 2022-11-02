let countriesColors = new Map<string, string>();

// 1
const Poland = {mainColor: {
    name: 'red',
    value: '#FF0000',
},
secondColor: {
    name: 'white',
    value: '#FFFFFF',
}
}
countriesColors.set('Poland', JSON.stringify(Poland))

// 2
const Qatar = {mainColor: {
    name: 'maroon',
    value: '#8A1538',
},
secondColor: {
    name: 'white',
    value: '#FFFFFF',
}
}
countriesColors.set('Qatar', JSON.stringify(Qatar))

// 3
const Senegal = {mainColor: {
    name: 'green',
    value: '#00853F',
},
secondColor: {
    name: 'yellow',
    value: '#FDEF42',
},
thirdColor: {
    name: 'red',
    value: '#E31B23',
}
}
countriesColors.set('Senegal', JSON.stringify(Senegal))

// 4
const Ecuador = {mainColor: {
    name: 'yellow',
    value: '#FFD100',
},
secondColor: {
    name: 'blue',
    value: '#0072CE',
},
thirdColor: {
    name: 'red',
    value: '#EF3340',
}
}
countriesColors.set('Ecuador', JSON.stringify(Ecuador))

// 5
const Netherlands = {mainColor: {
    name: 'orange',
    value: '#E2401E',
},
secondColor: {
    name: 'yellow',
    value: '#F6C50A',
},
thirdColor: {
    name: 'blue',
    value: '#2D558E',
}
}
countriesColors.set('Netherlands', JSON.stringify(Netherlands))
export default countriesColors;