public class ContentDownloadHandlerFactoryImpl implements Sfc.ContentDownloadHandlerFactory {
    public Sfc.ContentDownloadHandler getContentDownloadHandler(
        List<Id> ids, Sfc.ContentDownloadContext context
    ) {
        Sfc.ContentDownloadHandler contentDownloadHandler = new Sfc.ContentDownloadHandler();
        if(UserInfo.getProfileId() == '005xx000001SvogAAC') {
            contentDownloadHandler.isDownloadAllowed = true;
            return contentDownloadHandler;
        }
        if(context == Sfc.ContentDownloadContext.MOBILE) {
            contentDownloadHandler.isDownloadAllowed = false;
            contentDownloadHandler.downloadErrorMessage = 
            'Downloading a file from a mobile device isnt allowed.';
            return contentDownloadHandler;
        }
        contentDownloadHandler.isDownloadAllowed = false;
        contentDownloadHandler.downloadErrorMessage = 
        'This file needs to be IRM controlled. Youre not allowed to download it';
        contentDownloadHandler.redirectUrl ='/apex/IRMControl?Id='+ids.get(0);
        return contentDownloadHandler;
    }
}