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
    private int[] userColorArray;
    private int[] aiColorArray;
    private ArrayList<GameRound> gameRoundList = new ArrayList<GameRound>();
    private JottoManager jottoManager = new JottoManager();

    public ArrayList<GameRound> getGameRoundList() {
        return gameRoundList;
    }

    public int setGameRound() {
        int gameRoundResult;

        // no one wins yet = 0; user wins = 1; AI wins = 2; draw = 3;
        if (!this.userGuess.equals(this.aiWord) && !(this.aiGuess.equals(this.userWord))) {
            gameRoundResult = 0; // no one wins yet
        }
        else if (this.userGuess.equals(this.aiWord) && !(this.aiGuess.equals(this.userWord))) {
            gameRoundResult = 1; // user wins
            GameRound currentGameRound = new GameRound(this.userGuess, null, userColorArray, null);
            gameRoundList.add(currentGameRound);

            return gameRoundResult;
        }
        else {
            gameRoundResult = 2; // AI wins
        }

        GameRound currentGameRound = new GameRound(this.userGuess, this.aiGuess, userColorArray, aiColorArray);
        gameRoundList.add(currentGameRound);

        return gameRoundResult;
    }

    public JottoManager getJottoManager() {
        return jottoManager;
    }

    public String getAiWord() {
        return this.aiWord;
    }

    public void setAiWord() {
        this.aiWord = jottoManager.chooseAiWord();
    }

    public String getAiGuess() {
        return this.aiGuess;
    }

    public void setUserGuess(String userGuess) {
        this.userGuess = userGuess;
    }

    public String getUserWord() {
        return this.userWord;
    }

    public void setUserWord(String userWord) {
        this.userWord = userWord;
    }

    public int getGuessCount(boolean flag) {
        int guessCount;
        this.userGuessCount = 0;
        this.aiGuessCount = 0;

        // flag 0 = user; flag 1 = ai

        if (!flag) { // For user guess
            this.userColorArray = new int[5];
            for (int i = 0; i < 5; i++) {
                if (this.aiWord.contains(Character.toString(this.userGuess.charAt(i)))) {
                    userColorArray[i] = 1;
                    this.userGuessCount++;
                }
                else
                    userColorArray[i] = 0;
            }
            guessCount = this.userGuessCount;
        }
        else { // For AI guess
            this.aiColorArray = new int[5];
            this.aiGuess = jottoManager.chooseAiGuess(userWord);

            for (int i = 0; i < 5; i++) {
                if (this.userWord.contains(Character.toString(this.aiGuess.charAt(i)))) {
                    aiColorArray[i] = 1;
                    this.aiGuessCount++;
                }
                else
                    aiColorArray[i] = 0;
            }
            guessCount = this.aiGuessCount;
        }

        return guessCount;
    }

}
