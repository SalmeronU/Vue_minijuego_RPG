function randomValue (min,max){
    return (Math.floor(Math.random() * (max-min)) + min);
}

const game = Vue.createApp({
    data(){
        return{
            salud:100,
            saludMonstruo:100,
            numeroTurno:0,
            finalBatalla: null,
            registroEventos:[],
            ataquesBasicos:[
                {accion:'Tu espada impacta sobre la coraza de Mizutsune',dmg:4,idA:'1AB',color:'#831818'},
                {accion:'La hoja de tu espada atraviesa la coraza y logra cortar la carne de dragón',dmg:8,idA:'2AB',color:'#831818'},
                {accion:'El dragón se avalanza sobre ti justo antes de atacar y te derriba, rapidamente tomas un hacha y logras hacerlo retroceder rompiendo su mandibula',dmg:17,idA:'3AB',color:'#831818'},
                {accion:'Asestas un buen golpe con tu espada',dmg:6,idA:'4AB',color:'#831818'},
                {accion:'Logras colocarte debajo del vientre de Mizutsune, entierras tu espada profundamente y lo escuchas chillar de dolor',dmg:22,idA:'5AB',color:'#831818'},
                {accion:'Tu espada impacta en el largo cuello de Mizutsune',dmg:12,idA:'6AB',color:'#831818'},
                {accion:'Golpeas la frente de Mizutsune que es casi tan dura como tu acero',dmg:2,idA:'7AB',color:'#831818'},
                {accion:'Sales del camino de su mordida y aprovechas para atacar, tu espada golpea un colmillo y lo desprende violentamente de la boca de Mizutsune',dmg:10,idA:'8AB',color:'#831818'},
                {accion:'Tu espada es bloqueada por la dura garra de Mizutsune, sin embargo logras cortar hasta la carne de la bestia',dmg:7,idA:'9AB',color:'#831818'},
                {accion:'Mizustune intenta golpearte con su cola pero falla, te esfuerzas por cortarla pero tu espada se detiene en el hueso',dmg:15,idA:'10AB',color: '#831818'},
            ],
            ataquesUltimate:[
                {accion:'La energía elemental despierta en ti, tu espada se enciende en llamas y cortas a traves del pecho de Mizutsune',dmg:33,idA:'1AU',color:'#5154e6'},
                {accion:'La tierra se conecta contigo, raices gigantescas emergen del suelo y perforan a Mizutsune',dmg:35,idA:'2AU',color:'#5154e6'},
                {accion:'La luz encuentra tu cuerpo, todos tus golpes incineran a la cercanía y tu fuerza es diez veces mayor, blandes tu espada y le rompes un cuerno a Mizutsune',dmg:34,idA:'3AU',color:'#5154e6'}
            ],
            ataquesDragon:[
                {accion:'Mizutsune escupe una bomba de aire condensado que impacta la tierra a tu lado y te derriba',dmg:17,idA:'1AD',color:'#d39a66'},
                {accion:'Mizutsune salta y hace temblar la tierra, mientras intentas mantener el equilibro te golpea con su garra delantera',dmg:23,idA:'2AD',color:'#d39a66'},
                {accion:'Las alas de Mizutsune crean una corriente de aire que te lanza por los aires',dmg:14,idA:'3AD',color:'#d39a66'},
                {accion:'Eres embestido por Mizutsune, un cuerno estuvo cerca de perforarte',dmg:30,idA:'4AD',color:'#d39a66'},
                {accion:'Tes descuidaste y fuiste golpeado con la cola de Mizutsune',dmg:20,idA:'5AD',color:'#d39a66'},
            ],
        };
    },
    computed:{
        DynamicHealthMonster(){
            return {width: this.saludMonstruo+'%'};
        },
        DynamicHealth(){
            return {width: this.salud+'%'};
        },
        ultiDisponible(){
            return this.numeroTurno % 3!== 0;
        }  
    },
    watch:{
        salud(value){
            if(value <= 0){
                this.salud=0;
                if(this.saludMonstruo >0 )
                {
                    this.finalBatalla = 'Mizutsune ha ganado la batalla';
                }
                else
                {
                    this.finalBatalla = 'El cazador y el dragón cayeron juntos';
                }
            }
            else if(value>100)
            {
                this.salud=100;
            }
        },
        saludMonstruo(value){
            if(value < 0){
                this.saludMonstruo=0;
                if(this.salud >0)
                {
                    this.finalBatalla = 'El cazador puso al dragón a descansar';
                }
            }
        }
    },
    methods:{
        ataque(tipoAtaque){
            this.numeroTurno++;
            let nuevoAtaque;
            switch (tipoAtaque) {
                case 'basico':
                    nuevoAtaque = randomValue(1,9);
                    this.registroEventos.unshift(this.ataquesBasicos[nuevoAtaque]);
                    this.saludMonstruo -=  this.ataquesBasicos[nuevoAtaque].dmg;     
                    break;
                case 'ultimate':
                    nuevoAtaque= randomValue(1,3);
                    this.registroEventos.unshift(this.ataquesUltimate[nuevoAtaque]);
                    this.saludMonstruo -=  this.ataquesUltimate[nuevoAtaque].dmg;  
                break;
                default:
                    break;
            }
            this.ataqueMonstruo();
        },
        curacion(){
            this.numeroTurno++;
            this.registroEventos.unshift({accion:'Bebes un elixir de sangre de dragón, sientes tus huesos endurecer y tus heridas cerrar',heal:15,idA:"1H",color:'#56975b'});
            this.salud += 15;
            this.ataqueMonstruo();
        },
        surrender(){
            this.finalBatalla='Mizutsune ha ganado la batalla';
        },
        ataqueMonstruo(){
            if(this.saludMonstruo>0){
            const that = this;
            const nuevoAtaque = randomValue(1,4);
            setTimeout(function(){
                that.registroEventos.unshift(that.ataquesDragon[nuevoAtaque]);
                that.salud -= that.ataquesDragon[nuevoAtaque].dmg;
            }, 2000);
        }
        },
        restart(){
            this.numeroTurno=0;
            this.salud=100;
            this.saludMonstruo=100;
            this.registroEventos=[];
            this.finalBatalla=null;
        }
    },
});

game.mount('#game');