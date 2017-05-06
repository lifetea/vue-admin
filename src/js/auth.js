/* globals localStorage */

export default {
    login () {
        localStorage.token = true;

        // cb = arguments[arguments.length - 1]
        // if (localStorage.token) {
        //     if (cb) cb(true)
        //     this.onChange(true)
        //     return
        // }
        // pretendRequest(email, pass, (res) => {
        //     if (res.authenticated) {
        //         localStorage.token = res.token
        //         if (cb) cb(true)
        //         this.onChange(true)
        //     } else {
        //         if (cb) cb(false)
        //         this.onChange(false)
        //     }
        // })
    },
    setUser(user){
            localStorage.user = user? JSON.stringify(user): null
    },
    getUser(){
        let user = localStorage.user ? JSON.parse(localStorage.user) : {}
        console.log(user)
        return user
    },
    getToken () {
        return localStorage.token
    },

    logout (cb) {
        delete localStorage.token
        delete localStorage.user
        if (cb) cb()
        this.onChange(false)
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {}
}

// function pretendRequest (email, pass, cb) {
//     setTimeout(() => {
//         if (email === 'joe@example.com' && pass === 'password1') {
//             cb({
//                 authenticated: true,
//                 token: Math.random().toString(36).substring(7)
//             })
//         } else {
//             cb({ authenticated: false })
//         }
//     }, 0)
// }