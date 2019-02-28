package springboot.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@ComponentScan({"springboot.demo","springboot.controller", "springboot.database"})
@EnableMongoRepositories(basePackages = "springboot.database")
@SpringBootApplication()
public class JottoGameApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(JottoGameApplication.class);
    }
    public static void main(String[] args) {
        SpringApplication.run(JottoGameApplication.class, args);
    }

}
