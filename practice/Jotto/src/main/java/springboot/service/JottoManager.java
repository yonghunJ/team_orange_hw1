package springboot.service;

import springboot.database.Dictionary;

import java.util.ArrayList;

public class JottoManager {
    private ArrayList<Character> include = new ArrayList<Character>();
    private ArrayList<Character> exclude = new ArrayList<Character>();
    private ArrayList<String> ignoredWords = new ArrayList<String>();
    private int anagramCount = 0;
    private Dictionary dict = new Dictionary();

    public char[] toArray(ArrayList<Character> list){
        char[] toReturn = new char[list.size()];
        int i = 0;
        for(char c : list)
            toReturn[i ++] = c;
        return toReturn;
    }

    public String chooseAiWord() {
        // Typecasting
        char[] includeTemp = toArray(include);
        char[] excludeTemp = toArray(exclude);
        String[] ignoredWordsTemp = include.toArray(new String[include.size()]);

        // Get a word without repeating letters from DB
        String aiWord = dict.getWord(includeTemp, excludeTemp, 5, ignoredWordsTemp);

        return aiWord;
    }

    public String chooseAiGuess(int roundNum, String userWord) {
        String aiGuess = "";
        int guessCount = 0;

        // Typecasting
        char[] includeTemp = toArray(include);
        char[] excludeTemp = toArray(exclude);
        String[] ignoredWordsTemp = include.toArray(new String[include.size()]);

        // All jots have been found. Move to the next strategy.
        if (include.size() == 5) {
            aiGuess = dict.getWord(includeTemp, excludeTemp, 5, ignoredWordsTemp);
            ignoredWords.add(aiGuess);
        }
        else if (roundNum < 22) {
            aiGuess = dict.getWord(includeTemp, excludeTemp, 2, ignoredWordsTemp);

            for (int i = 0; i < 5; i++) {
                if (userWord.contains(Character.toString(aiGuess.charAt(i)))) {
                    guessCount++;
                }
            }
        }

        return aiGuess;
    }

    public char[] getTwoLetters(String aiGuess) {
        char[] arr = new char[2];

        arr[0] = aiGuess.charAt(0);

        for (int i = 1; i < 5; i++) {
            if (aiGuess.charAt(i) != arr[0])
                arr[1] = aiGuess.charAt(i);
        }

        return arr;
    }

}