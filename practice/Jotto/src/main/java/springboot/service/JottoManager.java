package springboot.service;

import java.util.ArrayList;

public class JottoManager {
    private ArrayList<Character> jots = new ArrayList<Character>();
    private ArrayList<Character> notInJots = new ArrayList<Character>();
    private ArrayList<Character> uncertainLetters = new ArrayList<Character>();
    private ArrayList<String> threeTwoLetters = new ArrayList<String>();
    private ArrayList<String> anagrams = new ArrayList<String>();
    private int anagramCount = 0;

    public JottoManager() {
        this.threeTwoLetters.add("ajaja");
        this.threeTwoLetters.add("alala");
        this.threeTwoLetters.add("anana");
        this.threeTwoLetters.add("arara");
        this.threeTwoLetters.add("cocco");
        this.threeTwoLetters.add("mamma");
        this.threeTwoLetters.add("pappa");
        this.threeTwoLetters.add("reree");
        this.threeTwoLetters.add("tatta");
        this.threeTwoLetters.add("ululu");
        this.threeTwoLetters.add("xxxii");
    }




    public String chooseAiWord() {
        // Consider I got a legal starting word from DB
        String aiWord = "";

        return aiWord;
    }

    public String chooseAiGuess(int roundNum, String userWord) {
        String aiGuess = "";
        int guessCount = 0;





        // All jots have been found. Move to the next strategy.
        if (jots.size() == 5) {
            aiGuess = rearrangeFiveLetters();
        }
        else if (roundNum < 22) {
            aiGuess = threeTwoLetters.get(roundNum % 11);

            for (int i = 0; i < 5; i++) {
                if (aiGuess.contains(Character.toString(userWord.charAt(i)))) {
                    guessCount++;
                }
            }
            if (guessCount == 0) {
                char[] twoLetters = getTwoLetters(aiGuess);
                if (!notInJots.contains(twoLetters[1])) {
                    notInJots.add(twoLetters[1]);
                }
                if (!notInJots.contains(twoLetters[0])) {
                    notInJots.add(twoLetters[0]);
                }
            }
            else if (guessCount == 1) {
                char[] twoLetters = getTwoLetters(aiGuess);

                if (jots.contains(twoLetters[0])) {
                    notInJots.add(twoLetters[1]);
                    uncertainLetters.remove(twoLetters[1]);
                }
                else if (jots.contains(twoLetters[1])) {
                    notInJots.add(twoLetters[0]);
                    uncertainLetters.remove(twoLetters[0]);
                }
                else if (notInJots.contains(twoLetters[0])) {
                    jots.add(twoLetters[1]);
                    uncertainLetters.remove(twoLetters[1]);
                }
                else if (notInJots.contains(twoLetters[1])) {
                    jots.add(twoLetters[0]);
                    uncertainLetters.remove(twoLetters[0]);
                }
                else {
                    if (!uncertainLetters.contains(twoLetters[0])) {
                        uncertainLetters.add(twoLetters[0]);
                    }
                    if (!uncertainLetters.contains(twoLetters[1])) {
                        uncertainLetters.add(twoLetters[1]);
                    }
                }
            }
            else { // guessCount == 2
                char[] twoLetters = getTwoLetters(aiGuess);
                if (!jots.contains(twoLetters[0])) {
                    jots.add(twoLetters[0]);
                }
                if (!jots.contains(twoLetters[1])) {
                    jots.add(twoLetters[1]);
                }
            }
        }
        else { // roundNum >= 22

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

    public String rearrangeFiveLetters() {
        String aiGuess = "";

        // Consider I did NOT get an anagram list from DB yet
        if (anagramCount == 0) {
            // -------------- Get an anagram list from DB ----------------

            // -----------------------------------------------------------

            aiGuess = anagrams.get(anagramCount);
            anagramCount++;
        }
        else { // Consider I did got an anagram list from DB before
            aiGuess = anagrams.get(anagramCount);
            anagramCount++;
        }

        return aiGuess;
    }

}