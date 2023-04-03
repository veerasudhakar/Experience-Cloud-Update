public class StaticTest{
    public static Boolean doNotRunTrigger = false;

    public static Void setDoNotRunTrigger(){
        doNotRunTrigger = true;
    }

    public static Boolean shouldRunTrigger() {
        return !doNotRunTrigger;
    }
}