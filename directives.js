app.directive("ngFileSelect", function(fileReader, $timeout, $rootScope) {
    return {
        scope: {

            ngModel: '='
        },
        link: function($scope, el) {
            function getFile(file) {

                fileReader.readAsDataUrl(file, $scope)
                    .then(function(result) {
                        $timeout(function() {
                            $scope.ngModel = result;
                            $rootScope.storeImage= file;
                        });
                    });
            }

            el.bind("change", function(e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);

            });
        }
    };
});

app.factory("fileReader", function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function(reader, scope) {
        return function(event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function(file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});


app.directive("imgUpload",function($http,$compile, $rootScope){
    return {
        restrict : 'AE',
        scope : {

            url : "@",
            method : "@"
        },
        template : 	'<input class="fileUpload" type="file" multiple />'+
            '<div class="dropzone">'+
            '<p class="msg">Click or Drag and Drop files to upload</p>'+
            '</div>'+
            '<button class="btn" ng-click="updateImages(data.src)">upload all</button>'+
            '<div class="preview clearfix">'+
            '<div class="previewData clearfix" ng-repeat="data in previewData track by $index">'+
            '<img src={{data.src}}></img>'+
            '<div class="previewDetails">'+
            '<div class="detail"><b>Name : </b>{{data.name}}</div>'+
            '<div class="detail"><b>Type : </b>{{data.type}}</div>'+
            '<div class="detail"><b>Size : </b> {{data.size}}</div>'+
            '</div>'+
            '<div class="previewControls">'+
            '<span ng-click="updateNewImage(data)" class="circle upload">'+
            '<i class="fa fa-check"></i>'+
            '</span>'+
            '<span ng-click="remove(data)" class="circle remove">'+
            '<i class="fa fa-close"></i>'+
            '</span>'+
            '</div>'+
            '</div>'+
            '</div>',
        link : function(scope,elem,attrs){
            var formData = new FormData();
            scope.previewData = [];

            function previewFile(file){
                var reader = new FileReader();
                var obj = new FormData().append('file',file);
                reader.onload=function(data){
                    var src = data.target.result;
                    var size = ((file.size/(1024*1024)) > 1)? (file.size/(1024*1024)) + ' mB' : (file.size/		1024)+' kB';
                    scope.$apply(function(){
                        scope.previewData.push({'name':file.name,'size':size,'type':file.type,
                            'src':src,'data':obj});
                    });
                    console.log(scope.previewData);
                }
                reader.readAsDataURL(file);
            }

            function uploadFile(e,type){
                e.preventDefault();
                var files = "";
                if(type == "formControl"){
                    files = e.target.files;
                } else if(type === "drop"){
                    files = e.originalEvent.dataTransfer.files;
                }
                for(var i=0;i<files.length;i++){
                    var file = files[i];
                    if(file.type.indexOf("image") !== -1){
                        previewFile(file);
                    } else {
                        alert(file.name + " is not supported");
                    }
                }
            }
            elem.find('.fileUpload').bind('change',function(e){
                uploadFile(e,'formControl');
            });

            elem.find('.dropzone').bind("click",function(e){
                $compile(elem.find('.fileUpload'))(scope).trigger('click');
            });

            elem.find('.dropzone').bind("dragover",function(e){
                e.preventDefault();
            });

            elem.find('.dropzone').bind("drop",function(e){
                uploadFile(e,'drop');
            });

           /* scope.upload=function(obj){
                $http({method:scope.method,url:scope.url,data: obj.data,
                    headers: {'Content-Type': undefined},transformRequest: angular.identity
                }).success(function(data){

                });
            }*/

scope.updateNewImage= function(data){
    $rootScope.updateNewImage(data.src);
}


            scope.remove=function(data){
                var index= scope.previewData.indexOf(data);
                scope.previewData.splice(index,1);
            }
        }
    }
});
