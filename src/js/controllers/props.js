angular
  .module('pncApp')
  .controller('PropsIndexCtrl', PropsIndexCtrl)
  .controller('PropsShowCtrl', PropsShowCtrl);

PropsIndexCtrl.$inject = ['$http', '$uibModal'];
function PropsIndexCtrl($http, $uibModal) {
  const vm = this;
  vm.results = [];
  vm.area = null;
  vm.beds = null;

  function getProps(){
    $http.get('/api/properties', { params: {area: vm.area, minimum_beds: vm.beds, maximum_beds: vm.beds}})
      .then((response) => {
        vm.results = response.data;
        // console.log(vm.results);
      });
  }
  vm.getProps = getProps;

  function openModal(thisProp) {
    $uibModal.open({
      templateUrl: 'js/views/props/show.html',
      controller: 'PropsShowCtrl as propsShow',
      windowClass: 'app-modal-window',
      resolve: {
        selectedProp: () => {
          return thisProp;
        }
      }
    });
  }
  vm.openModal = openModal;
}

PropsShowCtrl.$inject = ['User', 'GroupProperty', '$http', '$stateParams', 'selectedProp', '$uibModalInstance'];
function PropsShowCtrl(User, GroupProperty, $http, $stateParams, selectedProp, $uibModalInstance){
  const vm = this;
  // vm.listingId = $stateParams.listing_id;
  // console.log('LISTINGID', vm.listingId);
  // // console.log(vm.listingId);
  // showProp();
  //
  // function showProp(){
  //   $http.get('/api/properties/:listingId', { params: { listingId: vm.listingId } })
  //     .then((response) => {
  //       vm.selected = response.data;
  //
  //     });
  // }
  vm.selected = selectedProp;

  console.log('SELECTEDLISTINGID', vm.selected.listing_id);
  function storeProp(){
    const newProperty = {
      listingId: vm.selected.listing_id
    };

    GroupProperty
      .save(newProperty)
      .$promise
      .then((property) => {
        console.log(property);
        vm.newProperty = {};
      });
  }
  vm.store = storeProp;

  function closeModal(){
    $uibModalInstance.close();
  }
  vm.closeModal = closeModal;
}
