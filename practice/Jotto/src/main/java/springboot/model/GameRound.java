package springboot.model;

public class GameRound {
    String userGuess;
    String aiGuess;
    int[] userColorArray;
    int[] aiColorArray;

    public GameRound(String userGuess, String aiGuess, int[] userColorArray, int[] aiColorArray){
        this.userGuess = userGuess;
        this.aiGuess = aiGuess;
        this.userColorArray = userColorArray;
        this.aiColorArray = aiColorArray;
    }

    public String getUserGuess() {
        return userGuess;
    }

    public void setUserGuess(String userGuess) {
        this.userGuess = userGuess;
    }

    public String getAiGuess() {
        return aiGuess;
    }

    public void setAiGuess(String aiGuess) {
        this.aiGuess = aiGuess;
    }

    public int[] getUserColorArray() {
        return userColorArray;
    }

    public void setUserColorArray(int[] userColorArray) {
        this.userColorArray = userColorArray;
    }

    public int[] getAiColorArray() {
        return aiColorArray;
    }

    public void setAiColorArray(int[] aiColorArray) {
        this.aiColorArray = aiColorArray;
    }
}
