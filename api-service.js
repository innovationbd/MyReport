import config from "./config";
//const TOKEN = "9bc7e072e3d4389efa57c874a528a50bfa562599";

export class API {

    static loginAuth(body) {
        return fetch(`${config.apiUrlLogin}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }

    static createPlan(body, token) {
        return fetch(`${config.apiUrl}plan/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static getPlans(token) {
        return fetch(`${config.apiUrl}plan/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static updatePlan(id, body, token) {
        return fetch(`${config.apiUrl}plan/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }

    static createReport(body, token) {
        return fetch(`${config.apiUrl}input/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static getReports(token) {
        return fetch(`${config.apiUrl}input/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static updateReport(id, body, token) {
        return fetch(`${config.apiUrl}input/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static getSummarys(token) {
        return fetch(`${config.apiUrl}monthly/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static updateSummary(id, body, token) {
        return fetch(`${config.apiUrl}monthly/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static getUser(id, token) {
        return fetch(`${config.apiUrl}userInfo/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static getUsers(token) {
        return fetch(`${config.apiUrl}userInfo/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static updateUser(id, body, token) {
        return fetch(`${config.apiUrl}userInfo/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static getBranches(token) {
        return fetch(`${config.apiUrl}branch/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static getZones(token) {
        return fetch(`${config.apiUrl}zone/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static getUnits(token) {
        return fetch(`${config.apiUrl}unit/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static getResponsibilities(token) {
        return fetch(`${config.apiUrl}responsibility/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static getAdvices(token) {
        return fetch(`${config.apiUrl}advice/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static createAdvice(body, token) {
        return fetch(`${config.apiUrl}advice/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static postFeedback(body, token) {
        return fetch(`${config.apiUrl}feedback/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static changePassword(body, token) {
        return fetch(`${config.apiUrlChangepass}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static getNotifications(token) {
        return fetch(`${config.apiUrl}notification/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static getBooks(token) {
        return fetch(`${config.apiUrl}book/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }

    /*static loginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static registerUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }

    static getMovies(token) {
        return fetch("http://127.0.0.1:8000/api/movies/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        }).then( resp => resp.json() )
    }
    static updateMovie(mov_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static createMovie(body, token) {
        return fetch(`http://127.0.0.1:8000/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json() )
    }
    static deleteMovie(mov_id, token) {
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then( resp => resp.json() )
    }*/
}