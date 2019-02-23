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
    int roundNum;
    int[] userColorArray = new int[5];
    int[] aiColorArray = new int[5];
    ArrayList<GameRound> gameRoundList = new ArrayList<GameRound>();

    public int getGuessCount(String guess, String word, boolean flag) {
        int guessCount = 0;

        return guessCount;
    }

    public void setGameRound() {

    }
}
