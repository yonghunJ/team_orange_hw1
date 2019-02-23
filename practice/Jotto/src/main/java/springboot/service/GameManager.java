package springboot.service;

import springboot.model.GameRound;

import java.util.ArrayList;

public class GameManager {
    String userWord;
    String aiWord;
    String userGuess;
    String aiGuess;
    int userGuessCount;
    int aiGuessCount;
    int roundNum = 0;
    int[] userColorArray;
    int[] aiColorArray;
    ArrayList<GameRound> gameRoundList = new ArrayList<GameRound>();

    public int getGuessCount(boolean flag) {
        int guessCount = 0;
        this.userGuessCount = 0;
        this.aiGuessCount = 0;
        this.userColorArray = new int[5];
        this.aiColorArray = new int[5];

        // flag 0 = user; flag 1 = ai
        for (int i = 0; i < 5; i++) {
            if (!flag) {
                if (aiWord.contains(Character.toString(this.userGuess.charAt(i)))) {
                    userColorArray[i] = 1;
                    this.userGuessCount++;
                }
                else
                    userColorArray[i] = 0;
                guessCount = this.userGuessCount;
            }
            else {
                if (userWord.contains(Character.toString(this.aiGuess.charAt(i)))) {
                    aiColorArray[i] = 1;
                    this.aiGuessCount++;
                }
                else
                    aiColorArray[i] = 0;
                guessCount = this.aiGuessCount;
            }
        }

        return guessCount;
    }

    public void setGameRound() {
        GameRound currentGameRound = new GameRound();
        currentGameRound.setUserGuess(this.userGuess);
        currentGameRound.setAiGuess(this.aiGuess);
        currentGameRound.setUserColorArray(userColorArray);
        currentGameRound.setAiColorArray(aiColorArray);

        gameRoundList.add(currentGameRound);
    }
}
