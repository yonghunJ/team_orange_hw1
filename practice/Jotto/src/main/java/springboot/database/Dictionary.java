package springboot.database;

import com.mongodb.MongoClient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class Dictionary {

    public static final String WORDS_DATABASE = "words";

    private MongoTemplate mongoTemplate;

    public Dictionary(){
        mongoTemplate = new MongoTemplate(new MongoClient(), "database");
    }

    public String getWord(char[] include, char[] exclude, Integer uniqueLetters, String[] ignoredWords){
        String[] with = new String(include).split("");
        String[] without = new String(exclude).split("");
        if(without[0].equals("")){without = new String[]{};}

        if(ignoredWords.length == 0){
            ignoredWords = new String[]{""};
        }

        SampleOperation sampleStage = Aggregation.sample(1);

        MatchOperation matchStage;
        Criteria criteria;
        if(uniqueLetters != null) {
            if (with[0].equals("")) {
                criteria = new Criteria().andOperator(
                        Criteria.where("word").nin(ignoredWords),
                        Criteria.where("letters").size(uniqueLetters),
                        Criteria.where("letters").nin(without));

            } else {
                criteria = new Criteria().andOperator(
                        Criteria.where("word").nin(ignoredWords),
                        Criteria.where("letters").size(uniqueLetters),
                        Criteria.where("letters").all(with),
                        Criteria.where("letters").nin(without));
            }
        }else{
            if (with[0].equals("")) {
                criteria = new Criteria().andOperator(
                        Criteria.where("word").nin(ignoredWords),
                        Criteria.where("letters").nin(without));

            } else {
                criteria = new Criteria().andOperator(
                        Criteria.where("word").nin(ignoredWords),
                        Criteria.where("letters").all(with),
                        Criteria.where("letters").nin(without));
            }
        }
        matchStage = Aggregation.match(criteria);

        Aggregation aggregation = Aggregation.newAggregation(matchStage, sampleStage);
        AggregationResults<Word> output = mongoTemplate.aggregate(aggregation, WORDS_DATABASE, Word.class);

        if(output.getMappedResults().isEmpty()){return null;}
        return output.getMappedResults().get(0).toString();
    }

    public boolean isValidWord(String word){
        Query query = new Query(Criteria.where("word").is(word));
        return mongoTemplate.exists(query, WORDS_DATABASE);
    }

}
