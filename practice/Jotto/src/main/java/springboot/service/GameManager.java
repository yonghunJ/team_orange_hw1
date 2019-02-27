package springboot.service;

import springboot.model.GameRound;

import java.util.ArrayList;

public class GameManager {
    private String userWord;
    private String aiWord;
    private String userGuess;
    private String aiGuess;
    private int userGuessCount;
    private int aiGuessCount;
    private int roundNum = 0;
    private int[] userColorArray;
    private int[] aiColorArray;
    private ArrayList<GameRound> gameRoundList = new ArrayList<GameRound>();
    private JottoManager jottoManager = new JottoManager();

    public int getGuessCount(boolean flag) {
        int guessCount;
        this.userGuessCount = 0;
        this.aiGuessCount = 0;
        this.userColorArray = new int[5];
        this.aiColorArray = new int[5];

        // flag 0 = user; flag 1 = ai

        if (!flag) { // For user guess
            for (int i = 0; i < 5; i++) {
                if (this.userGuess.contains(Character.toString(this.aiWord.charAt(i)))) {
                    this.userGuessCount++;
                }
                if (this.aiWord.contains(Character.toString(this.userGuess.charAt(i))))
                    userColorArray[i] = 1;
                else
                    userColorArray[i] = 0;
            }
            guessCount = this.userGuessCount;
        }
        else { // For AI guess
            this.aiGuess = jottoManager.chooseAiGuess(roundNum, userWord);

            for (int i = 0; i < 5; i++) {
                if (this.aiGuess.contains(Character.toString(this.userWord.charAt(i)))) {
                    this.aiGuessCount++;
                }
                if (this.userWord.contains(Character.toString(this.aiGuess.charAt(i))))
                    aiColorArray[i] = 1;
                else
                    aiColorArray[i] = 0;
            }
            guessCount = this.aiGuessCount;
        }

        return guessCount;
    }

    public void setGameRound() {
        GameRound currentGameRound = new GameRound();
        currentGameRound.setUserGuess(this.userGuess);
        currentGameRound.setAiGuess(this.aiGuess);
        currentGameRound.setUserColorArray(userColorArray);
        currentGameRound.setAiColorArray(aiColorArray);

        roundNum++;
        gameRoundList.add(currentGameRound);
    }
}
