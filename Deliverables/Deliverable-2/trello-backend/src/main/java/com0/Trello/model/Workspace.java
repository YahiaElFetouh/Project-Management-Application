package com0.Trello.model;

import jakarta.persistence.*;

@Entity
public class Workspace {
    @Id
    @Column(name = "workspace_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "workspace_name")
    private String name;

    @Column(name = "workspace_type")
    private String type;

    @Column(name = "workspace_desc")
    private String description;

    public Workspace(Long id, String name, String type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public Workspace(Long id, String name, String type, String description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
    }

    public Workspace() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
