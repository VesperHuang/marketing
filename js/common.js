Marketing.common = (function () {
    function navigateToView(view) {
        //Navigate to local/remote or external view
        Marketing.main.getKendoApplication().navigate(view);
    }
    function showGetVerifyCodeButton() {
        //show log off button.
        $(".collectlist-btn-getverifycode").show();
    }
    function hideVerifyCodeButton() {
        //hide log off button
        $(".collectlist-btn-getverifycode").hide();
    }
    return {
        navigateToView: navigateToView,
        showGetVerifyCodeButton: showGetVerifyCodeButton,
        hideVerifyCodeButton: hideVerifyCodeButton
    }
})();