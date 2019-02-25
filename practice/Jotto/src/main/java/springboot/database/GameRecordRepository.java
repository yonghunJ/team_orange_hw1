package springboot.database;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRecordRepository extends MongoRepository<GameRecord, String> {
}
