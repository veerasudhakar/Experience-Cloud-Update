public with sharing class FeedbackSurveyFormController {
    @AuraEnabled(cacheable=true)
    public static List<String> getRatingOptions() {
        return new List<String>{'1', '2', '3', '4', '5'};
    }
    @AuraEnabled
    public static void submitFeedback(String feedback, String rating) {
        // Save feedback and rating to a custom object or send it to an external system
    }
}