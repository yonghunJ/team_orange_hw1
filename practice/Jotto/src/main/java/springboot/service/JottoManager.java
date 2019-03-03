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
    private Dictionary dict = new Dictionary();

    public Dictionary getDict() {
        return dict;
    }

    public String chooseAiWord() {
        // Typecasting
        char[] includeTemp = toArray(include);
        char[] excludeTemp = toArray(exclude);
        String[] ignoredWordsTemp = ignoredWords.toArray(new String[ignoredWords.size()]);

        // Get a word without repeating letters from DB
        String aiWord = dict.getWord(includeTemp, excludeTemp, 5, ignoredWordsTemp);
        System.out.println(aiWord);

        return aiWord;
    }

    public String chooseAiGuess(String userWord) {
        String aiGuess = "";
        int guessCount = 0;
        Map<Character,Integer> charCount;
        char[] empty = new char[0];

        // Typecasting
        char[] includeTemp = toArray(include);
        char[] excludeTemp = toArray(exclude);
        String[] ignoredWordsTemp = ignoredWords.toArray(new String[ignoredWords.size()]);

        // All jots have been found. Try anagrams
        if (include.size() >= 5) {
            aiGuess = dict.getWord(includeTemp, empty, 5, ignoredWordsTemp);
        }
        // 2+3 word while exist
        else if (dict.getWord(empty, empty, 2, ignoredWordsTemp) != null) {
            // Get aiGuess from DB
            aiGuess = dict.getWord(empty, empty, 2, ignoredWordsTemp);
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
        // Keep doing again while include.size <= 3
        else if (dict.getWord(empty, excludeTemp, 3, ignoredWordsTemp) != null) {
            // Get aiGuess from DB
            aiGuess = dict.getWord(empty, excludeTemp, 3, ignoredWordsTemp);
            charCount = countChars(aiGuess); // Get HashMap with Character,Integer pair

            // Get guessCount
            guessCount = getGuseeCount(userWord, aiGuess);

            // Check whether aiGuess is 2+2+1 or 3+1+1
            int type = checkTypeOfWord(charCount, aiGuess);

            // If 2+2+1
            if (type == 2) {
                // If guessCount = 0, then exclude.add(c2) && exclude.add(c2) && exclude.add(c1)
                if (guessCount == 0) {
                    ArrayList<Character> keys = new ArrayList<Character>();
                    keys.addAll(charCount.keySet());
                    addUnique(exclude, keys);
                    System.out.println("0");
                }
                // If guessCount = 1, then include.add(c1) && exclude.add(c2) && exclude.add(c2)
                else if (guessCount == 1) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 1);
                    addUnique(include, keyToInclude);

                    ArrayList<Character> keyToExclude = new ArrayList<Character>();
                    keyToExclude = getKeysFromValue(charCount, 2);
                    addUnique(exclude, keyToExclude);
                    System.out.println("1");
                }
                // If guessCount = 3, then include.add(c1)
                else if (guessCount == 3) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 1);
                    addUnique(include, keyToInclude);
                    System.out.println("3");
                }
                // If guessCount = 4, then include.add(c2) && include.add(c2) && exclude.add(c1)
                else if (guessCount == 4) {
                    ArrayList<Character> keyToInclude = new ArrayList<Character>();
                    keyToInclude = getKeysFromValue(charCount, 2);
                    addUnique(include, keyToInclude);

                    ArrayList<Character> keyToExclude = new ArrayList<Character>();
                    keyToExclude = getKeysFromValue(charCount, 1);
                    addUnique(exclude, keyToExclude);
                    System.out.println("4");
                }
                // If guessCount = 5, then include.add(c2) && include.add(c2) && include.add(c1)
                else if (guessCount == 5) {
                    ArrayList<Character> keys = new ArrayList<Character>();
                    keys.addAll(charCount.keySet());
                    addUnique(include, keys);
                    System.out.println("5");
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
                else if (guessCount == 2) {
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
        // Case we run out of 3 unique letters words
        else {
            // Find 2+1+1+1 letters word
            // Get aiGuess from DB

            System.out.println("1" + include.toString());
            System.out.println("1" + exclude.toString());

            if (dict.getWord(includeTemp, excludeTemp, 4, ignoredWordsTemp) != null) {
                aiGuess = dict.getWord(includeTemp, excludeTemp, 4, ignoredWordsTemp);
            }
            else if (dict.getWord(includeTemp, empty, 4, ignoredWordsTemp) != null){
                aiGuess = dict.getWord(includeTemp, empty, 4, ignoredWordsTemp);
            }
            else
                aiGuess = dict.getWord(empty, excludeTemp, 4, ignoredWordsTemp);

            charCount = countChars(aiGuess); // Get HashMap with Character,Integer pair

            // Get guessCount
            guessCount = getGuseeCount(userWord, aiGuess);

            // If guessCount = 0, then exclude.add(c2) && exclude.add(c1) && exclude.add(c1) && exclude.add(c1)
            if (guessCount == 0) {
                ArrayList<Character> keys = new ArrayList<Character>();
                keys.addAll(charCount.keySet());
                addUnique(exclude, keys);
            }
            // If guessCount = 1, then exclude.add(c2)
            else if (guessCount == 1) {
                ArrayList<Character> keyToInclude = new ArrayList<Character>();
                keyToInclude = getKeysFromValue(charCount, 2);
                addUnique(exclude, keyToInclude);
            }
            // If guessCount = 4, then include.add(c2)
            else if (guessCount == 4) {
                ArrayList<Character> keyToInclude = new ArrayList<Character>();
                keyToInclude = getKeysFromValue(charCount, 2);
                addUnique(include, keyToInclude);
            }
            // If guessCount = 5, then include.add(c2) && include.add(c1) && include.add(c1) && include.add(c1)
            else if (guessCount == 5) {
                ArrayList<Character> keys = new ArrayList<Character>();
                keys.addAll(charCount.keySet());
                addUnique(include, keys);
            }
        }

        System.out.println(include.toString());
        System.out.println(exclude.toString());
        System.out.println(aiGuess);

        ignoredWords.add(aiGuess); // Update ignoredWords
        return aiGuess;
    }

    public char[] toArray(ArrayList<Character> list){
        char[] toReturn = new char[list.size()];
        int i = 0;
        for(char c : list)
            toReturn[i ++] = c;
        return toReturn;
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

        System.out.println(aiGuess + "  //  " + result);

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