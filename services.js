app.factory('request', function ($http) {
    return {
        collectionRequest: function (collection, callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findCity",
                params: {
                    collection: collection
                }
            }).then(function (data) {
                callback(data.data);
            })
        },
        updateAlbum: function (file, name, id, collection) {
            let fd = new FormData();
            fd.append("name", name);
            fd.append('collection', collection);
            fd.append('id', id);
            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/updateAlbum", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },

        updateStory: function (file, id, title, text) {
            let fd = new FormData();
            fd.append("title", title);
            fd.append('text', text);
            fd.append('id', id);
            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/updateStory", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },


        storyRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findStory",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },
        reviewRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findReview",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },

        updateReview: function (id, name, text) {

            let fd = {};
            fd["id"] = id;
            fd["name"] = name;
            fd["text"] = text;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/updateReview?id=" + id + "&name=" + name + "&text=" + text
            })


        },

        aboutRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findAbout",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },

        updateAbout: function (id, name, file, text, mission) {
            let fd = new FormData();
            fd.append('id', id);
            fd.append("name", name);
            fd.append('text', text);
            fd.append("mission", mission);
            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/updateAbout", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },


        contactRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findContact",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },

        updateContact: function (id, facebook, email, phone) {

            let fd = {};
            fd["id"] = id;
            fd["facebook"] = facebook;
            fd["email"] = email;
            fd["phone"] = phone;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/updateContact?id=" + id + "&facebook=" + facebook + "&email=" + email + "&phone=" + phone
            })


        },
        addNewStory: function (title, text, file) {
            let fd = new FormData();
            fd.append('title', title);
            fd.append("text", text);

            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/addNewStory", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },

        addNewCity: function (album, name, file, files) {
            let fd = new FormData();
            fd.append('album', album);
            fd.append("name", name);

            fd.append("file", file);
            fd.append("files", files);//suppose to be last
            $http.post("http://tactravels.com:3000/addNewCity", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },

        addNewAlbum: function (album) {

            let fd = {};
            fd["album"] = album;


            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/addNewAlbum?album=" + album
            })


        },

        addNewReview: function (name, text) {

            let fd = {};

            fd["name"] = name;
            fd["text"] = text;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/addNewReview?name=" + name + "&text=" + text
            })


        },

        deleteReview: function (id) {

            let fd = {};

            fd["id"] = id;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteReview?id=" + id
            })


        },

        deleteStory: function (id) {

            let fd = {};

            fd["id"] = id;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteStory?id=" + id
            })


        },

        deleteAlbum: function (album) {

            let fd = {};

            fd["album"] = album;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteAlbum?album=" + album
            })


        },

        deleteCity: function (album, id) {

            let fd = {};

            fd["album"] = album;
            fd["id"] = id;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteCity?id=" + id + "&album=" + album
            })


        },




    }
});





