package springboot.model;

public class GameRound {
    String userGuess;
    String aiGuess;
    int[] userColorArray = new int[5];
    int[] aiColorArray = new int[5];

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

    public int[] getAiColorArray() {
        return aiColorArray;
    }
}
