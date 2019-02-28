package springboot.service;

import com.microsoft.applicationinsights.core.dependencies.apachecommons.lang3.StringUtils;
import springboot.database.Dictionary;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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
        Map<Character,Integer> charCount;

        // Typecasting
        char[] includeTemp = toArray(include);
        char[] excludeTemp = toArray(exclude);
        String[] ignoredWordsTemp = include.toArray(new String[include.size()]);

        // All jots have been found. Move to the next strategy.
        if (include.size() == 5) {
            aiGuess = dict.getWord(includeTemp, excludeTemp, 5, ignoredWordsTemp);
            ignoredWords.add(aiGuess);
        }
        // 2+3 word while exist
        else if (dict.getWord(includeTemp, excludeTemp, 2, ignoredWordsTemp) != null) {
            // Get aiGuess from DB
            aiGuess = dict.getWord(includeTemp, excludeTemp, 2, ignoredWordsTemp);
            ignoredWords.add(aiGuess); // Update ignoredWords
            charCount = countChars(aiGuess); // Get HashMap with Character,Integer pair

            // Get guessCount
            guessCount = getGuseeCount(userWord, aiGuess);

            // If guessCount = 0, then exclude.add(c2) && exclude.add(c3)
            if (guessCount == 0) {
                ArrayList<Character> keys = new ArrayList<Character>();
                keys.addAll(charCount.keySet());
                addUnique(exclude, keys);
            }
            // If guessCount = 2, then include.add(c2) && exclude.add(c3)
            else if (guessCount == 2) {
                ArrayList<Character> keyToInclude = new ArrayList<Character>();
                keyToInclude = getKeysFromValue(charCount, 2);
                addUnique(include, keyToInclude);

                ArrayList<Character> keyToExclude = new ArrayList<Character>();
                keyToExclude = getKeysFromValue(charCount, 3);
                addUnique(exclude, keyToExclude);
            }
            // If guessCount = 3, then include.add(c3) && exclude.add(c2)
            else if (guessCount == 3) {
                ArrayList<Character> keyToInclude = new ArrayList<Character>();
                keyToInclude = getKeysFromValue(charCount, 3);
                addUnique(include, keyToInclude);

                ArrayList<Character> keyToExclude = new ArrayList<Character>();
                keyToExclude = getKeysFromValue(charCount, 2);
                addUnique(exclude, keyToExclude);
            }
            // If guessCount = 5, then include.add(c2) && include.add(c3)
            else if (guessCount == 5) {
                ArrayList<Character> keys = new ArrayList<Character>();
                keys.addAll(charCount.keySet());
                addUnique(include, keys);
            }
        }
        // Keep doing again while include.size = 5
        else {
            // Get aiGuess from DB
            aiGuess = dict.getWord(includeTemp, excludeTemp, 3, ignoredWordsTemp);
            ignoredWords.add(aiGuess); // Update ignoredWords
            charCount = countChars(aiGuess); // Get HashMap with Character,Integer pair

            // Check whether aiGuess is 2+2+1 or 3+1+1
            int type = checkTypeOfWord(charCount, aiGuess);

            // If 2+2+1
            if (type == 2) {
                // If guessCount = 0, then exclude.add(c2) && exclude.add(c2) && exclude.add(c1)
                if (guessCount == 0) {
                    ArrayList<Character> keys = new ArrayList<Character>();
                    keys.addAll(charCount.keySet());
                    addUnique(exclude, keys);
                }
                // If guessCount = 1, then include.add(c1) && exclude.add(c2) && exclude.add(c2)
                else if (guessCount == 1) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 1);
                    addUnique(include, keyToInclude);

                    ArrayList<Character> keyToExclude = new ArrayList<Character>();
                    keyToExclude = getKeysFromValue(charCount, 2);
                    addUnique(exclude, keyToExclude);
                }
                // If guessCount = 3, then include.add(c1)
                else if (guessCount == 3) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 1);
                    addUnique(include, keyToInclude);
                }
                // If guessCount = 4, then include.add(c2) && include.add(c2) && exclude.add(c1)
                else if (guessCount == 4) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 2);
                    addUnique(include, keyToInclude);

                    ArrayList<Character> keyToExclude = new ArrayList<Character>();
                    keyToExclude = getKeysFromValue(charCount, 1);
                    addUnique(exclude, keyToExclude);
                }
                // If guessCount = 5, then include.add(c2) && include.add(c2) && include.add(c1)
                else if (guessCount == 5) {
                    ArrayList<Character> keys = new ArrayList<Character>();
                    keys.addAll(charCount.keySet());
                    addUnique(include, keys);
                }
            }
            // If 3+1+1
            else if (type == 3) {
                // If guessCount = 0, then exclude.add(c3) && exclude.add(c1) && exclude.add(c1)
                if (guessCount == 0) {
                    ArrayList<Character> keys = new ArrayList<Character>();
                    keys.addAll(charCount.keySet());
                    addUnique(exclude, keys);
                }
                // If guessCount = 2, then exclude.add(c3) && include.add(c1) && include.add(c1)
                else if (guessCount == 1) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 1);
                    addUnique(include, keyToInclude);

                    ArrayList<Character> keyToExclude = new ArrayList<Character>();
                    keyToExclude = getKeysFromValue(charCount, 3);
                    addUnique(exclude, keyToExclude);
                }
                // If guessCount = 3, then include.add(c3) && exclude.add(c1) && exclude.add(c1)
                else if (guessCount == 3) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 3);
                    addUnique(include, keyToInclude);

                    ArrayList<Character> keyToExclude = new ArrayList<Character>();
                    keyToExclude = getKeysFromValue(charCount, 1);
                    addUnique(exclude, keyToExclude);
                }
                // If guessCount = 4, then include.add(c3)
                else if (guessCount == 4) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 3);
                    addUnique(include, keyToInclude);
                }
                // If guessCount = 5, then include.add(c3) && include.add(c1) && include.add(c1)
                else if (guessCount == 5) {
                    ArrayList<Character> keys = new ArrayList<Character>();
                    keys.addAll(charCount.keySet());
                    addUnique(include, keys);
                }
            }
        }

        return aiGuess;
    }

    public int getGuseeCount(String userWord, String aiGuess) {
        int guessCount = 0;

        // Get guessCount
        for (int i = 0; i < 5; i++) {
            if (userWord.contains(Character.toString(aiGuess.charAt(i)))) {
                guessCount++;
            }
        }

        return guessCount;
    }

    public int checkTypeOfWord(Map<Character, Integer> charCount, String aiGuess) {
        int result = 0;

        for (int i = 0; i < 5; i++) {
            // return 2 if 2+2+1
            if (charCount.get(aiGuess.charAt(i)) == 2)
                result = 2;
                // return 2 if 3+1+1
            else if (charCount.get(aiGuess.charAt(i)) == 3)
                result = 3;
        }

        return result;
    }

    public void addUnique(ArrayList<Character> list, ArrayList<Character> charsToAdd) {
        for (Character c: charsToAdd) {
            if (!list.contains(c))
                list.add(c);
        }
    }

    public static ArrayList<Character> getKeysFromValue(Map<Character, Integer> map, Integer value){
        ArrayList <Character>list = new ArrayList<Character>();
        for(Character c:map.keySet()){
            if(map.get(c).equals(value)) {
                list.add(c);
            }
        }
        return list;
    }

    public Map<Character,Integer> countChars(String aiGuess) {
        Map<Character,Integer> charCount = new HashMap<Character, Integer>();
        int count = 0;

        for (int i = 0; i < 5; i++) {
            count = StringUtils.countMatches(aiGuess, aiGuess.charAt(i));
            charCount.put(aiGuess.charAt(i), count);
        }

        return charCount;
    }

}