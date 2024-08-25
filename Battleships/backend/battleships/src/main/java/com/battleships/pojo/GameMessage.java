package com.battleships.pojo;

import java.util.List;

public class GameMessage {

    private GameState state;

    private String target;

    private boolean gameOver;

    private boolean isMissingPlayer;




    public GameMessage() {
    }

    public GameMessage(GameState state) {
        this.state = state;
    }
    public GameMessage(GameState state, String target) {
        this.state = state;
        this.target = target;
    }

    public GameMessage(GameState state, String target, boolean gameOver) {
        this.state = state;
        this.target = target;
        this.gameOver = gameOver;
    }

    public GameMessage(GameState state, String target, boolean gameOver, boolean isMissingPlayer) {
        this.state = state;
        this.target = target;
        this.gameOver = gameOver;
        this.isMissingPlayer = isMissingPlayer;
    }



    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public GameState getState() {
        return state;
    }

    public void setState(GameState state) {
        this.state = state;
    }

    public boolean getGameOver() {
        return gameOver;
    }

    public void setGameOver(boolean gameOver) {
        this.gameOver = gameOver;
    }


    public boolean getIsMissingPlayer() {
        return isMissingPlayer;
    }

    public void setIsMissingPlayer(boolean missingPlayer) {
        this.isMissingPlayer = missingPlayer;
    }



    @Override
    public String toString() {
        return "GameMessage{" +
                "state=" + state +
                ", target='" + target + '\'' +
                ", gameOver=" + gameOver +
                ", isMissingPlayer=" + isMissingPlayer +
                '}';
    }
}
