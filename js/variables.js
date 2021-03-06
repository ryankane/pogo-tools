const PkmnTempPattern = /^V\d+_POKEMON_\w+$/;
const PkmnModel = {
  templateId : true,
  pokemonSettings : {
    pokemonId : true,
    stats : true
  }
};

const FieldDefaults = {
  pokemon : 'V0386_POKEMON_DEOXYS_DEFENSE',
  cp : 1500,
  level : 20,
  prioritizeIvs : true,
  prioritizePvp : true
};

const Sorters = {
  default : [
    { name : 'cp'  , reverse: true },
    { name : 'lvl' , reverse: true },
    { name : 'atk' , reverse: true },
    { name : 'def' , reverse: true },
    { name : 'sta' , reverse: true }
  ],
  pvp : [
    { name : 'cp'  , reverse: true },
    { name : 'lvl' , reverse: true },
    { name : 'sta' , reverse: true },
    { name : 'def' , reverse: true },
    { name : 'atk' , reverse: true }
  ]
};

const LevelHints = [{
  level : 15,
  info  : 'Great League and Research'
}, {
  level : 20,
  info  : 'Raids'
}, {
  level : 25,
  info  : 'Ultra League and Raids (Boosted)'
}, {
  level : 35,
  info  : 'Maximum Wild Spawn'
}, {
  level : 40,
  info  : 'Master League'
}];

const CombatMultiplers = [
  { level: 1.0,  multiplier : 0.094000000 },
  { level: 1.5,  multiplier : 0.135137432 },
  { level: 2.0,  multiplier : 0.166397870 },
  { level: 2.5,  multiplier : 0.192650919 },
  { level: 3.0,  multiplier : 0.215732470 },
  { level: 3.5,  multiplier : 0.236572661 },
  { level: 4.0,  multiplier : 0.255720050 },
  { level: 4.5,  multiplier : 0.273530381 },
  { level: 5.0,  multiplier : 0.290249880 },
  { level: 5.5,  multiplier : 0.306057377 },
  { level: 6.0,  multiplier : 0.321087600 },
  { level: 6.5,  multiplier : 0.335445036 },
  { level: 7.0,  multiplier : 0.349212680 },
  { level: 7.5,  multiplier : 0.362457751 },
  { level: 8.0,  multiplier : 0.375235590 },
  { level: 8.5,  multiplier : 0.387592406 },
  { level: 9.0,  multiplier : 0.399567280 },
  { level: 9.5,  multiplier : 0.411193551 },
  { level: 10.0, multiplier : 0.422500010 },
  { level: 10.5, multiplier : 0.432926419 },
  { level: 11.0, multiplier : 0.443107550 },
  { level: 11.5, multiplier : 0.453059958 },
  { level: 12.0, multiplier : 0.462798390 },
  { level: 12.5, multiplier : 0.472336083 },
  { level: 13.0, multiplier : 0.481684950 },
  { level: 13.5, multiplier : 0.490855800 },
  { level: 14.0, multiplier : 0.499858440 },
  { level: 14.5, multiplier : 0.508701765 },
  { level: 15.0, multiplier : 0.517393950 },
  { level: 15.5, multiplier : 0.525942511 },
  { level: 16.0, multiplier : 0.534354330 },
  { level: 16.5, multiplier : 0.542635767 },
  { level: 17.0, multiplier : 0.550792690 },
  { level: 17.5, multiplier : 0.558830576 },
  { level: 18.0, multiplier : 0.566754520 },
  { level: 18.5, multiplier : 0.574569153 },
  { level: 19.0, multiplier : 0.582278910 },
  { level: 19.5, multiplier : 0.589887917 },
  { level: 20.0, multiplier : 0.597400010 },
  { level: 20.5, multiplier : 0.604818814 },
  { level: 21.0, multiplier : 0.612157290 },
  { level: 21.5, multiplier : 0.619399365 },
  { level: 22.0, multiplier : 0.626567130 },
  { level: 22.5, multiplier : 0.633644533 },
  { level: 23.0, multiplier : 0.640652950 },
  { level: 23.5, multiplier : 0.647576426 },
  { level: 24.0, multiplier : 0.654435630 },
  { level: 24.5, multiplier : 0.661214806 },
  { level: 25.0, multiplier : 0.667934000 },
  { level: 25.5, multiplier : 0.674577537 },
  { level: 26.0, multiplier : 0.681164920 },
  { level: 26.5, multiplier : 0.687680648 },
  { level: 27.0, multiplier : 0.694143650 },
  { level: 27.5, multiplier : 0.700538673 },
  { level: 28.0, multiplier : 0.706884210 },
  { level: 28.5, multiplier : 0.713164996 },
  { level: 29.0, multiplier : 0.719399090 },
  { level: 29.5, multiplier : 0.725571552 },
  { level: 30.0, multiplier : 0.731700000 },
  { level: 30.5, multiplier : 0.734741009 },
  { level: 31.0, multiplier : 0.737769480 },
  { level: 31.5, multiplier : 0.740785574 },
  { level: 32.0, multiplier : 0.743789430 },
  { level: 32.5, multiplier : 0.746781211 },
  { level: 33.0, multiplier : 0.749761040 },
  { level: 33.5, multiplier : 0.752729087 },
  { level: 34.0, multiplier : 0.755685510 },
  { level: 34.5, multiplier : 0.758630378 },
  { level: 35.0, multiplier : 0.761563840 },
  { level: 35.5, multiplier : 0.764486065 },
  { level: 36.0, multiplier : 0.767397170 },
  { level: 36.5, multiplier : 0.770297266 },
  { level: 37.0, multiplier : 0.773186500 },
  { level: 37.5, multiplier : 0.776064962 },
  { level: 38.0, multiplier : 0.778932750 },
  { level: 38.5, multiplier : 0.781790055 },
  { level: 39.0, multiplier : 0.784636970 },
  { level: 39.5, multiplier : 0.787473578 },
  { level: 40.0, multiplier : 0.790300010 }
];
