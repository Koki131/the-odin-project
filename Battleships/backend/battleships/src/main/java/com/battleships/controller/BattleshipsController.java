package com.battleships.controller;


import com.battleships.pojo.Game;
import com.battleships.pojo.GameMessage;
import com.battleships.pojo.GameState;
import com.battleships.pojo.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.Map;


@Controller
public class BattleshipsController {

    @GetMapping("/")
    public String getHome() {

        return "view/index";
    }

    @GetMapping("/selectMode/{mode}/{id}")
    public String getMode(@PathVariable("mode") String mode, @PathVariable("id") String id, HttpSession session) {


        if (!Game.users.containsKey(id)) return "redirect:/";

        String joiningUserId = session.getId();

        if (!Game.boardStates.containsKey(id)) {
            GameState state = new GameState(id);
            Game.boardStates.put(id, state);
        } else {
            GameState state = Game.boardStates.get(id);

            if (state.getPrivateGameFull()) return "redirect:/";

            state.setPrivateGameFull(true);
        }

        Game.users.remove(joiningUserId);
        User user = new User(joiningUserId);
        Game.users.put(joiningUserId, user);

        Game.users.get(joiningUserId).setGameId(id);
        Game.users.get(joiningUserId).setRematch(true);

        return "redirect:http://localhost:3000?mode=" + mode + "&id=" + id;
    }
    @GetMapping("/selectMode")
    public String getMode(@RequestParam("mode") String mode, HttpSession session) {

        String id = session.getId();

        Game.users.remove(id);
        User user = new User(id);
        Game.users.put(id, user);


        if (mode.equals("friend")) {

            return "redirect:/selectMode/" + mode  + "/" + id;
        }


        return "redirect:http://localhost:3000?mode=" + mode;
    }

    @MessageMapping("/queue.join")
    @SendTo("/topic/join")
    public GameMessage joinQueue(User user) {

        Game.lock.lock();
        try {

            GameState rematch = Game.boardStates.get(user.getGameId());

            if (rematch != null && user.getRematch()) {

                if ((rematch.getPlayer1() != null && rematch.getPlayer2() != null) || (rematch.getPlayer1() == null && rematch.getPlayer2() == null)) {
                    rematch.setPlayer1(user);
                    rematch.setPlayer2(null);

                    return new GameMessage(rematch);
                } else if (rematch.getPlayer2() == null && !rematch.getPlayer1().getId().equals(user.getId())) {
                    rematch.setPlayer2(user);
                    rematch.setTurn(user.getId());
                    return new GameMessage(rematch);
                }
            }


            if (!Game.tempUsersInQueue.containsKey(user.getId())) {
                Game.usersInQueue.add(user);
                Game.tempUsersInQueue.put(user.getId(), user);
            }

            User op = null;

            for (User opponent : Game.usersInQueue) {

                if (!opponent.getId().equals(user.getId())) {
                    op = opponent;
                    break;

                }

            }

            if (op != null) {
                Game.usersInQueue.remove(op);
                Game.usersInQueue.remove(user);
                Game.tempUsersInQueue.remove(user.getId());
                Game.tempUsersInQueue.remove(op.getId());

                GameState state = Game.boardStates.get(op.getId());

                if (state != null) {
                    state.setPlayer2(user);
                    state.setTurn((int) Math.round(Math.random() * 0.5) < 0.5 ? user.getId() : op.getId());
                    Game.users.get(user.getId()).setGameId(state.getGameId());
                    Game.users.get(op.getId()).setGameId(state.getGameId());
                    state.getPlayer1().setGameId(state.getGameId());
                    state.getPlayer2().setGameId(state.getGameId());

                    return new GameMessage(state);
                }
            }



            if (!Game.tempUsersInQueue.containsKey(user.getId())) {
                Game.usersInQueue.add(user);
                Game.tempUsersInQueue.put(user.getId(), user);
            }

            GameState state = new GameState(user);
            Game.boardStates.put(user.getId(), state);

            return new GameMessage(state);

        } finally {
            Game.lock.unlock();
        }

    }

    @MessageMapping("/game/{gameId}")
    @SendTo("/topic/game/{gameId}")
    public GameMessage gameData(@DestinationVariable String gameId, GameMessage message) {

        if (message.getGameOver() || message.getIsMissingPlayer()) {
            if (message.getIsMissingPlayer() && message.getState() != null) {
                Game.boardStates.remove(message.getState().getGameId());
            }
            return message;
        }

        if (message.getTarget() != null) {

            String turn = message.getState().getTurn();
            User player1 = message.getState().getPlayer1();
            User player2 = message.getState().getPlayer2();
            Map<String, Boolean> board1 = player1.getBoard();
            Map<String, Boolean> board2 = player2.getBoard();


            if (turn.equals(player1.getId())) {
                if (board2.get(message.getTarget())) {
                    message.getState().setShipHit(true);
                    board2.put(message.getTarget(), false);
                } else {
                    message.getState().setShipHit(false);
                    message.getState().setTurn(player2.getId());
                }
            } else {
                if (board1.get(message.getTarget())) {
                    message.getState().setShipHit(true);
                    board1.put(message.getTarget(), false);
                } else {
                    message.getState().setShipHit(false);
                    message.getState().setTurn(player1.getId());
                }
            }
        }


        return message;
    }

    @MessageMapping("/game/private/{gameId}")
    @SendTo("/topic/game/private/{gameId}")
    public GameMessage privateGameDisconnect(GameMessage message) {

        Game.boardStates.remove(message.getState().getGameId());

        return message;
    }


}
