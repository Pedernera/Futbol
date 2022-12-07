export default function appReducer(state, action) {
    const { payload, type } = action;
        switch(type){
            case "GET_JUGADORES":  return {...state, jugadores: payload}
            case "GET_JUGADOR":    return {...state, jugador: payload}
            case "GET_EQUIPOS":    return {...state, equipos: payload}
            case "GET_ESTADIOS":   return {...state, estadios: payload}
            case "GET_PARTIDOS":   return {...state, partidos: payload} 
            case "GET_POSICIONES": return {...state, posiciones: payload} 
            case "GET_TORNEOS":    return {...state, torneos: payload}

            case "ADD_JUGADOR":    return {...state, jugadores: [...state.jugadores, payload]}
            case "ADD_EQUIPO":     return {...state, equipos:   [...state.equipos, payload]}
            case "ADD_ESTADIO":    return {...state, estadios:  [...state.estadios, payload]}
            case "ADD_TORNEO":     return {...state, torneos:   [...state.torneos, payload]}

            case "DELETE_JUGADOR": return {...state, jugadores: state.jugadores.filter(j => j.id !== payload)}
            case "DELETE_EQUIPO":  return {...state, equipos:state.equipos.filter(e => e.id !== payload), jugadores: state.jugadores.filter(j => j.Equipo_id !== payload)}
            case "DELETE_ESTADIO": return {...state, estadios: state.estadios.filter(e => e.id !== payload)}
            case "DELETE_TORNEO":  return {...state, torneos: state.torneos.filter(t => t.id !==payload)}
            case "EDIT_JUGADOR":   return {...state, jugadores: state.jugadores.map(j => ( j.id === payload.id ? payload : j)) }
            case "EDIT_EQUIPO":    return {...state, equipos: state.equipos.map(e => (e.id === payload.id ? payload : e))}
            case "EDIT_ESTADIO":   return {...state, estadios: state.estadios.map(e => (e.id === payload.id ? payload : e))}
            default: return state;
        }
  }
