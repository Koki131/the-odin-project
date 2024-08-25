package com.battleships.controller;

import com.battleships.pojo.Game;
import com.battleships.pojo.GameState;
import com.battleships.pojo.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class BattleshipsRestController {

    @GetMapping("/getUsers")
    public Map<String, User> getUsers() {

        return Game.users;

    }

    @GetMapping("/getCurrentUser")
    public User getUser(HttpSession session) {

        return Game.users.get(session.getId());
    }

    @PostMapping("/updateCurrentUser")
    public void updateUser(@RequestBody User user) {

        User currUser = Game.users.get(user.getId());

        if (currUser == null) return;

        GameState state = Game.boardStates.get(user.getGameId());


        currUser.setRematch(user.getRematch());
        currUser.setGameId(user.getGameId());


        if (state != null) {


            if (!user.getRematch()) {
                Game.boardStates.remove(user.getGameId());
            }

        }
    }
}
